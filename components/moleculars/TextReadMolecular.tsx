import * as React from "react";
import { StyleSheet } from "react-native";
import TextInputAtom, { MATH } from "../atoms/TextInputAtom";
import { TextInputPropsEx } from "../organisms/common/CommonOneBlockTeeth";

export default function TextReadMolecular(props: TextInputPropsEx) {
  return <TextInputAtom {...props} editable={false} style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    width: MATH * 3,
    fontWeight: "bold",
  },
});
