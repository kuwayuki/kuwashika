import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const MATH = 35;
export default function TextInputAtom(props: TextInputProps) {
  return <TextInput {...props} style={[styles.base, props.style]} />;
}

const styles = StyleSheet.create({
  base: {
    height: MATH,
    width: MATH,
    borderWidth: 0.3,
    padding: 0,
    alignItems: "center",
    textAlign: "center",
  },
});
