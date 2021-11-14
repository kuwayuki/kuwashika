import * as React from "react";
import { StyleSheet, TextInputProps } from "react-native";
import TextInputAtom from "../atoms/TextInputAtom";

export const MATH = 35;
export default function TextInputTeethMolecular(props: TextInputProps) {
  return <TextInputAtom {...props} style={[styles.base, props.style]} />;
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
