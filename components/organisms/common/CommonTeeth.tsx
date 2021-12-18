import * as React from "react";
import { View } from "react-native";
import { AppContext } from "../../../App";
import { TEETH_TYPE } from "../../../constants/Constant";
import TextInputLargeMolecular from "../../moleculars/TextInputLargeMolecular";
import TextInputMolecularPcr from "../../moleculars/TextInputMolecularPcr";
import TextInputPcrMolecular from "../../moleculars/TextInputPcrMolecular";
import TextInputSmallMolecular from "../../moleculars/TextInputSmallMolecular";
import { TEETH_MATH } from "../../moleculars/TextInputTeethMolecular";

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
const PCR_MATH_4 = [0, 1, 2, 3];

/**
 * 横３マス
 * @returns
 */
export default function CommonTeeth(props: teethProps) {
  const appContext = React.useContext(AppContext);

  const onTouchBlDrAction = (teethNum: number) => {
    if (props.isPcr) {
      // PCR
      props.setTeethValue(
        teethNum,
        {
          ...props.teethValues[teethNum],
          value: props.teethValues[teethNum]?.value === 1 ? 0 : 1,
        } as TEETH_TYPE,
        props.isPrecision
      );
    } else {
      if (
        appContext.pressedValue !== 101 &&
        appContext.pressedValue !== 102 &&
        appContext.pressedValue !== 110
      )
        return;

      if (appContext.pressedValue !== 110) {
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
      }
    }
  };

  const textInputProps = (props: any) => {
    if (props.isPcr) return <TextInputMolecularPcr {...props} />;
    return props.isPrecision ? (
      <TextInputSmallMolecular {...props} />
    ) : (
      <TextInputLargeMolecular {...props} />
    );
  };

  const pcrTeeth = () => {
    const len = TEETH_MATH * 2;
    const isFocus = [
      props.teethValues[indexInit]?.index,
      props.teethValues[indexInit + 1]?.index,
      props.teethValues[indexInit + 2]?.index,
      props.teethValues[indexInit + 3]?.index,
    ].includes(props.focusNumber);
    return (
      <View
        style={{
          overflow: "hidden",
          maxWidth: len,
          maxHeight: len,
          minWidth: len,
          minHeight: len,
          // borderColor: "#696969",
          // backgroundColor: "#696969",
          // borderWidth: focusIndex === 0 ? 2 : 0.5,
          borderStyle: "solid",
          borderWidth: isFocus ? 2 : 0.5,
          // borderLeftWidth: focusIndex === 0 ? 2 : 0.5,
          // borderTopWidth: focusIndex === 0 ? 2 : 0.5,
          // borderRightWidth: focusIndex === 0 ? 2 : 0.5,
          // borderBottomWidth: focusIndex === 0 ? 2 : 0.5,
        }}
      >
        {PCR_MATH_4.map((math) => teeth(math))}
      </View>
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
      isPcr: props.isPcr,
    };

    return textInputProps(obj);
  };

  // (16 x 段番号 + 歯のグループ番号)
  const times = props.isPrecision ? 3 : 1;
  const indexInit = props.isPcr
    ? props.teethGroupIndex * 4
    : 16 * props.teethRows * times + (props.teethGroupIndex % 16) * times;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {props.isPcr
        ? pcrTeeth()
        : props.isPrecision
        ? PPD_PARTS.map((count) => teeth(count))
        : teeth(0)}
    </View>
  );
}
