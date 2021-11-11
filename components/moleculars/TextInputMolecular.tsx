import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import TextInputAtom from "../atoms/TextInputAtom";

export default function TextInputMolecular(props: TextInputPropsEx) {
  const onFocus = () => {
    props.onTouchStart;
    if (props.setFocusNumber) props.setFocusNumber(props.teethValue.index);
  };
  const isFocus =
    props.teethValue !== undefined &&
    props.focusNumber !== undefined &&
    props.teethValue.index === props.focusNumber;
  const isInputed = props.value && props.value !== "";
  const isMT =
    props.mtTeethNums &&
    props.teethValue &&
    props.mtTeethNums.includes(props.teethValue.index);

  return (
    <TextInputAtom
      {...props}
      editable={false}
      onTouchStart={() => onFocus()}
      style={[
        props.style,
        isMT
          ? { backgroundColor: "#696969", borderWidth: 0 }
          : isFocus
          ? { backgroundColor: "skyblue", fontWeight: "bold", borderWidth: 2 }
          : isInputed
          ? { backgroundColor: "#F8F8FF" }
          : { backgroundColor: "#ededed" },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
