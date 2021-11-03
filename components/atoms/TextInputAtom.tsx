import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { TextInputPropsEx } from "../organisms/common/CommonOneBlockTeeth";

export const MATH = 16;
export default function TextInputAtom(props: TextInputPropsEx) {
  const [state, setState] = React.useState({ backgroundColor: "#ededed" });
  const lastNameRef = React.useRef<React.LegacyRef<any>>();
  let textInput: any = null;
  const onFocus = () => {
    // textInput.focus();
    if (props.setCurrentNumber)
      props.setCurrentNumber(props.value ? Number(props.value) + 4 : 0);
    setState({
      backgroundColor: "skyblue",
    });
  };

  const onBlur = () => {
    // textInput.focus();
    setState({
      backgroundColor: "#ededed",
    });
  };
  const moveFocus = () => {
    // console.log("ZZZZZZ");
    // textInput.focus();
  };

  return (
    <TextInput
      {...props}
      onBlur={() => onBlur()}
      onFocus={() => onFocus()}
      ref={props.refInput}
      style={[
        styles.base,
        props.style,
        { backgroundColor: state.backgroundColor },
      ]}
    />
  );
}

const base = {
  height: MATH,
  width: MATH,
  borderWidth: 0.3,
  padding: 0,
  alignItems: "center",
  textAlign: "center",
};
const styles = StyleSheet.create({
  base: {
    height: MATH,
    width: MATH,
    borderWidth: 0.3,
    padding: 0,
    alignItems: "center",
    textAlign: "center",
    focusedTextInput: {
      backgroundColor: "green",
    },
  },
});
