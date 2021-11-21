import * as Print from "expo-print";
import * as React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { AppContext } from "../../../App";
import { TEETH_ALL } from "../../../constants/Constant";

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

  const createTr = (td?: any, thName?: string, isNo = false) => {
    return `<tr align="center" style="border: 1px solid #595959; ${
      isNo && "background: #ca9715"
    }">${createTh(thName)}${td ?? ""}</tr>`;
  };

  const createTh = (thName?: string) => {
    if (thName === undefined) return "</>";
    return `<th>${thName}</th>`;
  };

  const createTd = (value?: any, isPrecision = false) => {
    return `<td align="center" colspan="${
      isPrecision ? 3 : 1
    } style="border: 1px solid #595959; font-size: 3pt">${value ?? ""}</td>`;
  };

  const createHtml = (): string => {
    const data = appContext.currentPerson.data;
    const isPrecision = data.isPrecision;
    // 全体的なテーブルを作成

    // ヘッダー(真ん中のナンバー)を作成
    let No: string[] = ["", ""];
    TEETH_ALL.forEach((teeth) => {
      const td = createTd(teeth.teethNum, isPrecision);
      No[teeth.teethRow] = No[teeth.teethRow] + td;
    });

    // PPDを作成
    let ppd: string[] = ["", "", "", ""];
    const ppdData = isPrecision ? data.PPD.precision : data.PPD.basic;
    ppdData.forEach((num) => {
      if (num.teethRow === undefined) return;
      const td = createTd(num.value);
      ppd[num.teethRow] = ppd[num.teethRow] + td;
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
    ${createTr(ppd[0], "PPD: B")}
    ${isPrecision ? createTr(ppd[1], "PPD: P") : "</>"}
    ${No.map((n) => createTr(n, "", true))}
    ${createTr(ppd[isPrecision ? 2 : 1], isPrecision ? "PPD: L" : "PPD")}
    ${isPrecision ? createTr(ppd[3], "PPD: B") : "</>"}
  </table>
  <hr width: 100% size="1" color="#cc6666" style="border-style: dashed" />
  </html>
  `;
    // return `
    // <html>
    //   <head>
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    //   </head>
    //   <body style="text-align: center;">
    //     <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
    //       Hello Expo!
    //     </h1>
    //     <img
    //       src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
    //       style="width: 90vw;" />
    //   </body>
    // </html>
    // `;
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
});
