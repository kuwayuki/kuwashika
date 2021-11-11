import * as React from "react";
import { StyleSheet } from "react-native";
import { teethGroupProps } from "../../constants/Constant";
import { MATH } from "../atoms/TextInputAtom";
import TextInputMolecular from "./TextInputMolecular";

export default function TextReadMolecular(props: teethGroupProps) {
  return (
    <TextInputMolecular {...props} editable={false} style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: MATH * 3,
    fontWeight: "bold",
  },
});
