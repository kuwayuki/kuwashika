import * as Print from "expo-print";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  TEETH_ALL,
  TEETH_STATUS,
  TEETH_TYPE,
} from "../../../constants/Constant";
import ButtonAtom from "../../atoms/ButtonAtom";
import ButtonPressedMolecular from "../../moleculars/ButtonPressedMolecular";
import { PPD_PARTS } from "../ppd/PpdOneSideTeeth";

type buttonType = TEETH_TYPE & {
  color: string;
};
type CommonButtonPropsType = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  setTeethValue: (index: number, teethValue: TEETH_TYPE) => void;
  moveScroll: (index?: number) => void;
  pressedValue: number;
  setPressedValue: (pressedValue: number) => void;
};

export const BUTTON_NAMES = [
  { value: 0, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 1, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 2, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 3, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 4, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 5, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 6, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 7, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 8, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 9, status: TEETH_STATUS.NORMAL } as buttonType,
  { value: 10, display: "+", status: TEETH_STATUS.NORMAL } as buttonType,
  // { value: 11, display: "→", status: TEETH_STATUS.NORMAL } as buttonType,
  {
    value: 100,
    display: "MT",
    color: "#3366CC",
    status: TEETH_STATUS.MT,
  } as buttonType,
  {
    value: 101,
    display: "出血",
    color: "#FF3366",
    status: TEETH_STATUS.BLLEDING,
  } as buttonType,
  {
    value: 102,
    display: "排膿",
    color: "#FFCC00",
    status: TEETH_STATUS.DRAINAGE,
  } as buttonType,
  // { value: 100, display: "印刷", color: "#3399FF" } as buttonType,
];
export default function CommonBottomButton(props: CommonButtonPropsType) {
  const [selectedPrinter, setSelectedPrinter] = React.useState<Print.Printer>();

  const WARP = TEETH_ALL.length * PPD_PARTS.length;
  const LAST_ROWS = [WARP - 1, WARP * 2 - 1, WARP * 3 - 1, WARP * 4 - 1]; // 47, 95, 143, 191
  const WARP_ROWS = [WARP - 1, WARP, WARP * 3, WARP * 3 - 1]; // 47, 48, 144, 143
  const moveFocus = (index: number) => {
    // 第一指定：上「コ」⇒下「逆コ」
    // 上：[0 ～ ★47] ⇒ [95 ～ ★48] ⇒ 下：[191 ～ ★144] ⇒ [96 ～ ★143]
    let nextIndex = 0;
    if (WARP_ROWS.includes(index)) {
      // WARP_ROWSの場合は所定の場所にワープ
      const indexNum = WARP_ROWS.indexOf(index);
      switch (indexNum) {
        case 0:
          // 95へ移動
          nextIndex = LAST_ROWS[1];
          break;
        case 1:
          // 191へ移動
          nextIndex = LAST_ROWS[3];
          break;
        case 2:
          // 96へ移動
          nextIndex = LAST_ROWS[1] + 1;
          break;
        case 3:
          // 0へ移動
          nextIndex = 0;
          break;
      }
    } else if (index <= LAST_ROWS[0]) {
      nextIndex = index + 1;
    } else if (index <= LAST_ROWS[1]) {
      nextIndex = index - 1;
    } else if (index <= LAST_ROWS[2]) {
      nextIndex = index + 1;
    } else if (index <= LAST_ROWS[3]) {
      nextIndex = index - 1;
    }
    props.setFocusNumber(nextIndex);
    props.moveScroll(nextIndex);
    props.setPressedValue(-1);
  };

  const buttonAction = (button: TEETH_TYPE) => {
    if (button.value < 100) {
      props.setTeethValue(props.focusNumber, button);
      if (button.value < 10) {
        moveFocus(props.focusNumber);
      }
    } else {
      props.setPressedValue(
        props.pressedValue === button.value ? -1 : button.value
      );
    }
  };

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 20,
        paddingTop: 10,
        justifyContent: "space-between",
      }}
    >
      {BUTTON_NAMES.map((button) =>
        button.value < 100 ? (
          <ButtonAtom
            style={
              button.color !== undefined
                ? { backgroundColor: button.color }
                : undefined
            }
            onPress={() => buttonAction(button)}
          >
            {button.display ?? button.value}
          </ButtonAtom>
        ) : (
          <ButtonPressedMolecular
            style={[
              button.color !== undefined
                ? { backgroundColor: button.color }
                : undefined,
              props.pressedValue === button.value
                ? {
                    backgroundColor: button.color,
                    borderWidth: 2,
                  }
                : undefined,
            ]}
            onPress={() => buttonAction(button)}
          >
            {button.display ?? button.value}
          </ButtonPressedMolecular>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
