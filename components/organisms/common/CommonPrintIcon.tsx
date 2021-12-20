import * as Print from "expo-print";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { AppContext } from "../../../App";
import { teethType, TEETH_ALL, TEETH_TYPE } from "../../../constants/Constant";

export const SIZE = 48;
export default function CommonPrintIcon() {
  const [selectedPrinter, setSelectedPrinter] = React.useState<Print.Printer>();
  const appContext = React.useContext(AppContext);
  const print = async () => {
    const html = createHtml();
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
      orientation: "landscape",
    });
  };

  const createTr = (td: any, thName?: string, isNo = false) => {
    return `<tr align="center" style="border: 1px solid #595959; ${
      isNo && "background: #FFFFFF"
    }">${createTh(thName)}${td}${createTh(thName)}${createTh(thName)}</tr>`;
  };

  const createTh = (thName?: string) => {
    if (thName === undefined) return "";
    return `<th>${thName}</th>`;
  };

  const createTd = (teeth: TEETH_TYPE | string, isPrecision = false) => {
    let styles = `border: 1px solid #595959; font-size: 8pt; width: ${SIZE}px; height: ${SIZE}px;`;
    const value = typeof teeth !== "string" ? teeth.value ?? "" : teeth;
    if (typeof teeth !== "string") {
      const isMT = appContext.mtTeethNums?.includes(teeth.teethGroupIndex);

      if (isMT) {
        styles = `color:#696969; background-color:#696969; border:0px; width: ${SIZE}px; height: ${SIZE}px;`;
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
    const isMT = appContext.mtTeethNums?.includes(teeths[0].teethGroupIndex);
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
      const td = createTd(teeth.teethNum.toString(), isPrecision);
      No[teeth.teethRow] += td;
    });

    // PPDを作成
    let ppdTd: string[] = ["", "", "", ""];
    const ppdData = isPrecision
      ? currentPersonData.PPD.precision
      : currentPersonData.PPD.basic;
    ppdData.forEach((teeth: TEETH_TYPE) => {
      if (teeth.teethRow === undefined) return;
      const td = createTd(teeth);
      ppdTd[teeth.teethRow] += td;
    });

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
      ? currentPersonData.PCR.precision
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
    ${createTr(pcrTd[0], "PCR")}
    ${createTr(upsetTd[0], "動揺度")}
    ${createTr(ppdTd[0], "PPD: B")}
    ${isPrecision ? createTr(ppdTd[1], "PPD: P") : "</>"}
    ${createTr(No[0], "", true)}
    ${createTr(No[1], "", true)}
    ${createTr(ppdTd[isPrecision ? 2 : 1], isPrecision ? "PPD: L" : "PPD")}
    ${isPrecision ? createTr(ppdTd[3], "PPD: B") : "</>"}
    ${createTr(upsetTd[1], "動揺度")}
    ${createTr(pcrTd[1], "PCR")}
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
    />
  );
}
const styles = StyleSheet.create({});
