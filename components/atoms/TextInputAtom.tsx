import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function TextInputAtom(props: TextInputProps) {
  return <TextInput {...props} style={[styles.base, props.style]} />;
}

const styles = StyleSheet.create({
  base: {
    width: 160,
    borderWidth: 1,
    padding: 2,
  },
});
