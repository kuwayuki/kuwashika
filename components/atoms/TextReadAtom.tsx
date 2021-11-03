import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { Num } from "../organisms/CommonArea";
import { MATH } from "./TextInputAtom";

export default function TextReadAtom(num: Num) {
  return (
    <TextInput
      editable={false}
      style={styles.input}
      value={num.num.toString()}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: MATH,
    width: MATH * 3,
    borderWidth: 0.2,
    padding: 0,
    alignItems: "center",
    textAlign: "center",
  },
});
