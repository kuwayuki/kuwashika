import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const MATH = 16;
export default function TextInputAtom(props: TextInputProps) {
  return (
    <TextInput {...props} keyboardType={"phone-pad"} style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {
    height: MATH,
    width: MATH,
    borderWidth: 0.3,
    padding: 0,
    alignItems: "center",
    textAlign: "center",
  },
});
