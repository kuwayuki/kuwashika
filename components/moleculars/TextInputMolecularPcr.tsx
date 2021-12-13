import * as React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { PcrTextInputPropsEx } from "./TextInputPcrMolecular";
import TextInputTeethMolecular, { TEETH_MATH } from "./TextInputTeethMolecular";

/**
 * 参考：https://blog.narumium.net/2020/08/04/%E3%80%90react-native%E3%80%91%E3%83%9C%E3%82%BF%E3%83%B3%E3%81%AA%E3%81%A9%E3%81%AEui%E3%81%AB%E3%81%93%E3%81%A0%E3%82%8F%E3%82%8B/
 * @param props
 * @returns
 */
export default function TextInputMolecularPcr(props: PcrTextInputPropsEx) {
  const onFocus = () => {
    props.onTouchStart;
    if (props.setFocusNumber) props.setFocusNumber(props.teethValue?.index);
  };
  const isFocus =
    props.teethValue !== undefined &&
    props.teethValue.index === props.focusNumber;
  const isInputed = props.value && props.value !== "";
  const isMT = props.mtTeethNums?.includes(props.teethGroupIndex);

  const getStatusColorStyle = (): StyleProp<TextStyle> => {
    const len = TEETH_MATH * 2;

    // 欠損時の色
    if (isMT) {
      return !props.isHideNum
        ? {
            width: len * 2,
            height: len,
            backgroundColor: "#696969",
            borderWidth: 0,
            color: "#696969",
          }
        : { backgroundColor: "#696969" };
    }
    let indexStyle: StyleProp<TextStyle>;
    // 偶数の場合は縦長、奇数の場合は横長
    const topIndex =
      props.groupIndex % 4 === 0 ? 0 : -len * (1 + 0.5 * props.groupIndex);
    const leftIndex =
      props.groupIndex % 2 === 0
        ? (Math.pow(-1, props.groupIndex / 2) * len) / 2
        : 0;
    const color = "transparent";
    // props.index % 4 === 0
    //   ? "red"
    //   : props.index % 4 === 1
    //   ? "green"
    //   : props.index % 4 === 2
    //   ? "blue"
    //   : "pink";
    indexStyle = {
      position: "absolute",
      transform: [{ rotate: "-45deg" }, { scale: 0.70710678118 }],
      top: topIndex,
      left: leftIndex,
      width: len,
      height: len,
      borderWidth: 0.5,
      borderColor: "black",
      backgroundColor: color,
      borderStyle: "solid",
    };

    const style = {
      ...indexStyle,
      backgroundColor: isInputed ? "red" : "#ededed",
    } as StyleProp<TextStyle>;
    if (isFocus) {
      Object.assign(style, {
        borderWidth: 2,
      });
    }
    return style;
  };

  return (
    <View
      style={{
        minWidth: TEETH_MATH * 2,
        minHeight: TEETH_MATH * 2,
      }}
    >
      <TextInputTeethMolecular
        {...props}
        value={undefined}
        editable={false}
        onTouchStart={() => onFocus()}
        style={[props.style, getStatusColorStyle()]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
