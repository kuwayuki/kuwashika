import dayjs from "dayjs";
import "dayjs/locale/ja"; // これimportしないとエラー吐かれるa
// import { AdMobRewarded } from "expo-ads-admob";
import * as Print from "expo-print";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import {
  PRINT_PPD,
  PRINT_TITLE,
  teethType,
  TEETH_ALL,
  TEETH_TYPE,
} from "../../../constants/Constant";
import { pcrCalculation, ppdCalculation } from "../../../constants/Util";
import { AppContextDispatch, AppContextState } from "../../../App";
import * as StoreReview from "expo-store-review";

export const SIZE = 48;

export default function CommonPrintIcon() {
  const [selectedPrinter, setSelectedPrinter] = useState<Print.Printer>();
  const appContext = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);

  // 印刷処理（and 評価 and 広告）
  const print = async () => {
    const html = createHtml();
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      await Print.printAsync({
        html,
        useMarkupFormatter: true,
        // printerUrl: selectedPrinter?.url, // iOS only
        // orientation: "portrait",
        // orientation: "landscape",
        orientation: Print.Orientation.landscape,
      });
    } catch (error) {
    } finally {
      try {
        if (await StoreReview.hasAction()) {
          StoreReview.requestReview();
        }
      } catch (error) {
        console.log(error);
      }
      appContextDispatch.setAdmobShow(true);
    }
  };

  const createTr = (
    td: any,
    thName?: string,
    isNo = false,
    statisticsTitle?: string,
    statisticsValue?: string,
    rowSpanNum?: number
  ) => {
    const rowSpan = rowSpanNum ? `rowspan="${rowSpanNum}"` : "";
    const isTh = rowSpanNum !== 0;
    return `<tr align="center" style="border: 1px solid #595959; ${
      isNo && "background: #FFFFFF"
    }">${createTh(isTh ? thName : undefined, rowSpan)}${td}${createTh(
      isTh ? statisticsTitle ?? "" : undefined,
      rowSpan
    )}${createTh(isTh ? statisticsValue ?? "" : undefined, rowSpan)}</tr>`;
  };

  const createTh = (thName?: string, rowSpan?: string) => {
    if (thName === undefined) return "";
    let styles = `width: ${SIZE}px;`;
    return `<th ${rowSpan} style="${styles}">${thName}</th>`;
  };

  const createTd = (
    teeth: TEETH_TYPE | string,
    isPrecision = false,
    isHalfHeight = false
  ) => {
    const heightSize = isHalfHeight ? SIZE / 2 : SIZE;
    let styles = `border: 1px solid #595959; font-size: 8pt; width: ${SIZE}px; height: ${heightSize}px;`;
    const value = typeof teeth !== "string" ? teeth.value ?? "" : teeth;
    if (typeof teeth !== "string") {
      const isMT = appContext?.mtTeethNums
        ? appContext.mtTeethNums?.includes(teeth.teethGroupIndex)
        : true;

      if (isMT) {
        styles = `color:#696969; background-color:#696969; border:0px; width: ${SIZE}px; height: ${heightSize}px;`;
      } else {
        const isDrainage = teeth.status?.isDrainage;
        const isBleeding = teeth.status?.isBleeding;

        if (isDrainage) styles += " background-color:#FFCC00;";
        if (isBleeding) styles += " color:#FF3366;";
      }
    } else {
      styles += " background-color:#EEFEFE;";
    }

    return `<td align="center" colspan="${
      isPrecision ? 3 : 1
    }" style="${styles}" >${value ?? ""}</td>`;
  };

  const createTdPcr = (teeths: TEETH_TYPE[], isPrecision = false) => {
    const isMT = appContext?.mtTeethNums
      ? appContext.mtTeethNums?.includes(teeths[0].teethGroupIndex)
      : true;
    let styles = `border: 1px solid #595959; width: ${SIZE}px; height: ${SIZE}px; `;
    let divRhombusAll = "";
    if (isMT) {
      styles = `color:#696969; background-color:#696969; border:0px; width: ${SIZE}px; height: ${SIZE}px;`;
    } else {
      styles += `position: relative; overflow: hidden;`;
      let stylesRhombus =
        styles +
        `position: absolute; transform: rotate(45deg) scale(0.70710678118);`;

      // 菱形を４つ作る
      teeths.forEach((teeth) => {
        const index = teeth.index % 4;
        let tmpStyle = stylesRhombus;
        if (teeth.value === 1) tmpStyle += " background-color:red;";
        const topIndex =
          index % 2 === 0 ? 0 : index % 4 === 1 ? -SIZE * 0.5 : SIZE * 0.5;
        const leftIndex =
          index % 2 === 0 ? -(Math.pow(-1, index / 2) * SIZE) / 2 : 0;
        tmpStyle += ` top: ${topIndex}; left: ${leftIndex};`;

        const divRhombus = `<div style="${tmpStyle}"></div>`;
        divRhombusAll += divRhombus;
      });
      // 四角を作る
      // const divSquare = `<div style="${stylesSquare}">${divRhombus}</div>`;
    }

    return `<td align="center" colspan="${
      isPrecision ? 3 : 1
    }" style="${styles}">${divRhombusAll}</td>`;
  };

  const createHtml = (): string => {
    const currentPersonData = appContext.currentPerson.currentData;
    const isPrecision = currentPersonData.isPrecision;
    // 全体的なテーブルを作成

    // ヘッダー(真ん中のナンバー)を作成
    let No: string[] = ["", ""];
    TEETH_ALL.forEach((teeth: teethType) => {
      const td = createTd(teeth.teethNum.toString(), isPrecision, true);
      No[teeth.teethRow] += td;
    });

    // PPDを作成
    let ppdTd: string[] = ["", "", "", ""];
    const ppdData = isPrecision
      ? currentPersonData.PPD.precision
      : currentPersonData.PPD.basic;
    ppdData.forEach((teeth: TEETH_TYPE) => {
      if (teeth.teethRow === undefined) return;
      const td = createTd(teeth, undefined, isPrecision);
      ppdTd[teeth.teethRow] += td;
    });
    const ppdLow = ppdCalculation(
      ppdData,
      currentPersonData.mtTeethNums,
      PRINT_PPD.LOW
    );
    const ppdMiddle = ppdCalculation(
      ppdData,
      currentPersonData.mtTeethNums,
      PRINT_PPD.MIDDLE
    );
    const ppdHigh = ppdCalculation(
      ppdData,
      currentPersonData.mtTeethNums,
      PRINT_PPD.HIGH
    );

    // 動揺度を作成
    let upsetTd: string[] = ["", ""];
    const upsetData = currentPersonData.UPSET.basic;
    upsetData.forEach((teeth: TEETH_TYPE) => {
      if (teeth.teethRow === undefined) return;
      const td = createTd(teeth, isPrecision);
      upsetTd[teeth.teethRow] += td;
    });

    // PCRを作成
    let pcrTd: string[] = ["", "", "", ""];
    const pcrData = isPrecision
      ? currentPersonData.PCR.basic // FIXME: 直す？
      : currentPersonData.PCR.basic;
    TEETH_ALL.forEach((teeth: teethType) => {
      const teethPcr = pcrData.filter(
        (pcr) => pcr.teethGroupIndex === teeth.teethGroupIndex
      );
      const td = createTdPcr(teethPcr, isPrecision);
      pcrTd[teeth.teethRow] += td;
    });

    // pcrData.forEach((teeth: TEETH_TYPE) => {
    //   if (teeth.teethRow === undefined) return;
    //   const td = createTd(teeth);
    //   pcrTd[teeth.teethRow] += td;
    // });

    return `
    <html>
    <table
    border="1"
    style="
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 8px;
    "
  >
    ${createTr(
      pcrTd[0],
      "PCR",
      undefined,
      PRINT_TITLE[1],
      currentPersonData.inspectionDataName
    )}
    ${createTr(
      upsetTd[0],
      "動揺度",
      undefined,
      PRINT_TITLE[2],
      dayjs(currentPersonData.date).locale("ja").format("YYYY/MM/DD")
    )}
    ${createTr(
      ppdTd[0],
      isPrecision ? "PPD: B" : "PPD",
      undefined,
      PRINT_TITLE[3],
      (32 - currentPersonData.mtTeethNums.length).toString(),
      isPrecision ? 2 : 1
    )}
    ${
      isPrecision
        ? createTr(ppdTd[1], "PPD: P", undefined, undefined, undefined, 0)
        : "</>"
    }
    ${createTr(No[0], "", true, PRINT_TITLE[4], ppdLow.toString(), 2)}
    ${createTr(No[1], "", true, undefined, undefined, 0)}
    ${createTr(
      ppdTd[isPrecision ? 2 : 1],
      isPrecision ? "PPD: L" : "PPD",
      undefined,
      PRINT_TITLE[5],
      ppdMiddle.toString(),
      isPrecision ? 2 : 1
    )}
    ${
      isPrecision
        ? createTr(ppdTd[3], "PPD: B", undefined, undefined, undefined, 0)
        : "</>"
    }
    ${createTr(
      upsetTd[1],
      "動揺度",
      undefined,
      PRINT_TITLE[6],
      ppdHigh.toString()
    )}
    ${createTr(
      pcrTd[1],
      "PCR",
      undefined,
      PRINT_TITLE[7],
      pcrCalculation(pcrData, currentPersonData.mtTeethNums) + "%"
    )}
    </table>
  <hr width: 100% size="1" color="#cc6666" style="border-style: dashed" />
  </html>
  `;
  };

  return (
    <Icon
      raised
      name="print"
      type="font-awesome"
      color="#3399FF"
      onPress={print}
      containerStyle={{ margin: 0, padding: 0 }}
    />
  );
}
const styles = StyleSheet.create({});
