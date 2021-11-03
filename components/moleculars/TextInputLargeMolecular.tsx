import * as React from "react";
import { StyleSheet, TextInputProps } from "react-native";
import TextInputAtom, { MATH } from "../atoms/TextInputAtom";
import { TextInputPropsEx } from "../organisms/common/CommonOneBlockTeeth";

export default function TextInputLargeMolecular(props: TextInputPropsEx) {
  return (
    <TextInputAtom {...props} keyboardType={"phone-pad"} style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: MATH * 3,
    height: MATH * 2,
  },
});
