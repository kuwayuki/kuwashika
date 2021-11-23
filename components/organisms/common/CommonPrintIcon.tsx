import * as Print from "expo-print";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { AppContext } from "../../../App";
import { teethType, TEETH_ALL, TEETH_TYPE } from "../../../constants/Constant";

export default function CommonPrintIcon() {
  const [selectedPrinter, setSelectedPrinter] = React.useState<Print.Printer>();
  const appContext = React.useContext(AppContext);

  const print = async () => {
    const html = createHtml();
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
      orientation: "portrait",
    });
  };

  const createTr = (td: any, thName?: string, isNo = false) => {
    return `<tr align="center" style="border: 1px solid #595959; ${
      isNo && "background: #FFFFFF"
    }">${createTh(thName)}${td}</tr>`;
  };

  const createTh = (thName?: string) => {
    if (thName === undefined) return "";
    return `<th>${thName}</th>`;
  };

  const createTd = (teeth: TEETH_TYPE | string, isPrecision = false) => {
    let styles = "border: 1px solid #595959; font-size: 8pt;";
    const value = typeof teeth !== "string" ? teeth.value ?? "" : teeth;
    if (typeof teeth !== "string") {
      const isMT = appContext.mtTeethNums?.includes(teeth.teethGroupIndex);

      if (isMT) {
        styles = "color:#696969; background-color:#696969; border:0px";
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

  const createHtml = (): string => {
    const currentPersonData = appContext.currentPerson.data;
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
    // PCRを作成

    return `
    <html>
    <table
    border="1"
    style="
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      font-size: 8px;
    "
  >
    ${createTr(ppdTd[0], "PPD: B")}
    ${isPrecision ? createTr(ppdTd[1], "PPD: P") : "</>"}
    ${createTr(No[0], "", true)}
    ${createTr(No[1], "", true)}
    ${createTr(ppdTd[isPrecision ? 2 : 1], isPrecision ? "PPD: L" : "PPD")}
    ${isPrecision ? createTr(ppdTd[3], "PPD: B") : "</>"}
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
