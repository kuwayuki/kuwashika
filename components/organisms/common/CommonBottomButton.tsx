import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../../../App";
import { TEETH_STATUS, TEETH_TYPE } from "../../../constants/Constant";
import ButtonAtom from "../../atoms/ButtonAtom";
import ButtonPressedMolecular from "../../moleculars/ButtonPressedMolecular";

type buttonType = {
  status: TEETH_STATUS;
  value: number;
  color: string;
  display: string;
};
type CommonButtonPropsType = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  teethValues: TEETH_TYPE[];
  setTeethValue: (
    index: number,
    teethValue: TEETH_TYPE,
    isPrecision?: boolean
  ) => void;
  moveScroll: (index?: number) => void;
  mtTeethNums: number[];
  isPrecision?: boolean;
};

export const BUTTON_NAMES = [
  // { value: 0, status: TEETH_STATUS.NORMAL } as buttonType,
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
  { value: 11, display: "-", status: TEETH_STATUS.NORMAL } as buttonType,
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
  const appContext = React.useContext(AppContext);

  // １列の最大値
  const rows = props.teethValues.filter((value) => value.teethRow === 0);
  const MAX_ROW_ITEM_COUNT = rows.length;
  type warpType = { src: number; dst: number };

  // コの字タイプ(列順)
  const WARP_ROWS_PRECISION = [
    {
      src: MAX_ROW_ITEM_COUNT - 1,
      dst: MAX_ROW_ITEM_COUNT * 2 - 1,
    } as warpType,
    { src: MAX_ROW_ITEM_COUNT, dst: MAX_ROW_ITEM_COUNT * 4 - 1 } as warpType,
    {
      src: MAX_ROW_ITEM_COUNT * 3 - 1,
      dst: 0,
    } as warpType,
    { src: MAX_ROW_ITEM_COUNT * 3, dst: MAX_ROW_ITEM_COUNT * 2 } as warpType,
  ]; // 1列目：47(⇒95), 2列目：48(⇒191), 3列目：143(⇒0), 4列目：144(⇒96)

  const WARP_ROWS_BASIC = [
    {
      src: MAX_ROW_ITEM_COUNT - 1,
      dst: MAX_ROW_ITEM_COUNT * 2 - 1,
    } as warpType,
    {
      src: MAX_ROW_ITEM_COUNT,
      dst: 0,
    } as warpType,
  ]; // 1列目：15(⇒31), 2列目：16(⇒0)

  const moveFocus = (index: number) => {
    let nextIndex;
    const warptemp = props.isPrecision
      ? [...WARP_ROWS_PRECISION]
      : [...WARP_ROWS_BASIC];
    // 現在の列を取得
    const teeth = props.teethValues[index];
    // ワープの数値が現在よりも高い場合はプラス、低ければマイナス
    if (warptemp[teeth.teethRow].src > index) {
      nextIndex = index + 1;
    } else if (warptemp[teeth.teethRow].src < index) {
      nextIndex = index - 1;
    } else {
      // 同じならワープ(指定列の先頭 or 最後)
      nextIndex = warptemp[teeth.teethRow].dst;
    }

    const nextTeeth = props.teethValues[nextIndex];
    if (props.mtTeethNums.includes(nextTeeth.teethGroupIndex)) {
      // MTの場合は次のフォーカスに移動
      moveFocus(nextIndex);
    } else {
      props.setFocusNumber(nextIndex);
      props.moveScroll(nextIndex);
      appContext.setPressedValue(-1);
    }
  };

  /**
   * 画面下部ボタン押下時の処理
   * @param button
   */
  const buttonAction = (button: buttonType) => {
    if (button.value < 100) {
      // 歯の入力項目に数値を代入
      props.setTeethValue(
        props.focusNumber,
        {
          ...props.teethValues[props.focusNumber],
          status: undefined,
          value: button.value,
        } as TEETH_TYPE,
        appContext.isPrecision
      );
      if (button.value < 10) {
        // 10未満の場合は次の歯に移動
        moveFocus(props.focusNumber);
      }
    } else {
      appContext.setPressedValue(
        appContext.pressedValue === button.value ? -1 : button.value
      );
    }
  };

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
          // 通常ボタン
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
          // 押しっぱなしボタン
          <ButtonPressedMolecular
            style={[
              button.color !== undefined
                ? { backgroundColor: button.color }
                : undefined,
              appContext.pressedValue === button.value
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

const styles = StyleSheet.create({});
