import * as React from "react";
import { StyleSheet } from "react-native";
import TextInputAtom from "../atoms/TextInputAtom";
import { TextInputPropsEx } from "../organisms/common/CommonOneBlockTeeth";

export default function TextInputMolecular(props: TextInputPropsEx) {
  const onFocus = () => {
    props.onTouchStart;
    if (props.setFocusNumber) props.setFocusNumber(props.teethPartsIndex);
  };
  const isFocus =
    props.teethPartsIndex !== undefined &&
    props.focusNumber !== undefined &&
    props.teethPartsIndex === props.focusNumber;
  const isInputed = props.value && props.value !== "";
  const isMT =
    props.mtTeethNums &&
    props.teethIndex &&
    props.mtTeethNums.includes(props.teethIndex);

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
