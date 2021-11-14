import * as React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import TextInputAtom from "../atoms/TextInputAtom";

export default function TextInputMolecular(props: TextInputPropsEx) {
  const onFocus = () => {
    props.onTouchStart;
    if (props.setFocusNumber) props.setFocusNumber(props.teethValue?.index);
  };
  const isFocus =
    props.teethValue !== undefined &&
    props.teethValue.index === props.focusNumber;
  const isInputed = props.value && props.value !== "";
  const isBleeding = props.teethValue?.status?.isBleeding;
  const isDrainage = props.teethValue?.status?.isDrainage;
  const isMT = props.mtTeethNums?.includes(props.teethGroupIndex);

  const getStatusColorStyle = (): StyleProp<TextStyle> => {
    // 欠損時の色
    if (isMT) {
      return !props.isHideNum
        ? {
            backgroundColor: "#696969",
            borderWidth: 0,
            color: "#696969",
          }
        : { backgroundColor: "#696969" };
    }

    const style = {
      backgroundColor: isInputed ? "#F8F8FF" : "#ededed",
    } as StyleProp<TextStyle>;
    if (isFocus)
      Object.assign(style, {
        backgroundColor: "skyblue",
        fontWeight: "bold",
        borderWidth: 2,
      });
    if (isDrainage) Object.assign(style, { backgroundColor: "#FFCC00" });
    if (isBleeding) Object.assign(style, { color: "#FF3366" });

    return style;
  };

  return (
    <TextInputAtom
      {...props}
      editable={false}
      onTouchStart={() => onFocus()}
      style={[props.style, getStatusColorStyle()]}
    />
  );
}

const styles = StyleSheet.create({});
