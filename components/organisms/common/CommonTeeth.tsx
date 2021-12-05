import * as React from "react";
import { View } from "react-native";
import { AppContext } from "../../../App";
import { TEETH_TYPE } from "../../../constants/Constant";
import TextInputLargeMolecular from "../../moleculars/TextInputLargeMolecular";
import TextInputSmallMolecular from "../../moleculars/TextInputSmallMolecular";

export type teethProps = {
  teethValues: TEETH_TYPE[]; // 192 or 32の歯
  setTeethValue: (
    index: number,
    teethValue: TEETH_TYPE,
    isPrecision?: boolean
  ) => void;
  teethRows: number; // 基本：1～２列：精密１～４列
  teethGroupIndex: number; // 0 ～ 16番目のグループ
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  isPrecision?: boolean;
  isPcr?: boolean;
};

export const PPD_PARTS = [0, 1, 2];

/**
 * 横３マス
 * @returns
 */
export default function CommonTeeth(props: teethProps) {
  const appContext = React.useContext(AppContext);

  const onTouchBlDrAction = (teethNum: number) => {
    if (appContext.pressedValue !== 101 && appContext.pressedValue !== 102)
      return;

    // 出血及び排膿
    props.setTeethValue(
      teethNum,
      {
        ...props.teethValues[teethNum],
        status:
          appContext.pressedValue === 101
            ? { ...props.teethValues[teethNum].status, isBleeding: true }
            : { ...props.teethValues[teethNum].status, isDrainage: true },
      } as TEETH_TYPE,
      props.isPrecision
    );
  };

  const textInputProps = (props: any) => {
    return props.isPrecision ? (
      <TextInputSmallMolecular {...props} />
    ) : (
      <TextInputLargeMolecular {...props} />
    );
  };

  const teeth = (count?: number) => {
    const obj = {
      ...props,
      key:
        props.teethValues[indexInit + count]?.index?.toString() ??
        Math.random().toString(),
      value: props.teethValues[indexInit + count]?.value?.toString() ?? "",
      focusNumber: props.focusNumber,
      setFocusNumber: props.setFocusNumber,
      teethValue: props.teethValues[indexInit + count],
      mtTeethNums: appContext.mtTeethNums,
      blurOnSubmit: false,
      onTouchEnd: () => onTouchBlDrAction(indexInit + count),
    };

    return textInputProps(obj);
  };

  // (16 x 段番号 + 歯のグループ番号)
  const times = props.isPrecision ? 3 : 1;
  const indexInit =
    16 * props.teethRows * times + (props.teethGroupIndex % 16) * times;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {props.isPrecision ? PPD_PARTS.map((count) => teeth(count)) : teeth(0)}
    </View>
  );
}
