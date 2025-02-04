import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import { isAndroid } from "../../constants/Util";
import TextInputTeethMolecular from "./TextInputTeethMolecular";

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
            borderWidth: 0.4,
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
        borderStyle: "solid",
        // borderRightWidth: TEETH_MATH / 2,
        // borderRightColor: "transparent",
        // borderTopWidth: TEETH_MATH / 2,
        // borderTopColor: "red",
        // borderBottomWidth: TEETH_MATH / 2,
        // borderBottomColor: "red",
        // borderLeftWidth: TEETH_MATH / 2,
        // borderLeftColor: "transparent",
      });
    if (isDrainage) Object.assign(style, { backgroundColor: "#FFCC00" });
    if (isBleeding) Object.assign(style, { color: "#FF3366" });
    else Object.assign(style, { color: "#000" });

    return style;
  };

  return (
    <TextInputTeethMolecular
      {...props}
      editable={isAndroid()}
      // onTouchEnd={() => Keyboard.dismiss()}
      // editable={isIpad()} FIXME: 後で対応したい
      onTouchStart={() => onFocus()}
      style={[props.style, getStatusColorStyle()]}
    />
  );
}

const styles = StyleSheet.create({});
