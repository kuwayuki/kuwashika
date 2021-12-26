import * as React from "react";
import { StyleSheet } from "react-native";
import { teethGroupProps } from "../../constants/Constant";
import { TEETH_MATH } from "./TextInputTeethMolecular";
import TextInputMolecular from "./TextInputMolecular";

export default function TextReadMolecular(props: teethGroupProps) {
  return (
    <TextInputMolecular {...props} editable={false} style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: TEETH_MATH * 2,
    height: TEETH_MATH,
    fontWeight: "bold",
  },
});
