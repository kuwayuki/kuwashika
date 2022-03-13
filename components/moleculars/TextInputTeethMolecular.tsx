import * as React from "react";
import { StyleSheet, TextInputProps } from "react-native";
import TextInputAtom from "../atoms/TextInputAtom";

export const TEETH_MATH = 36;
export default function TextInputTeethMolecular(props: TextInputProps) {
  return <TextInputAtom {...props} style={[styles.base, props.style]} />;
}

const styles = StyleSheet.create({
  base: {
    height: TEETH_MATH,
    width: TEETH_MATH,
    borderWidth: 0.5,
    padding: 0,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
