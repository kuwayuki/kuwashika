import * as React from "react";
import { StyleSheet } from "react-native";
import TextInputAtom from "../atoms/TextInputAtom";
import { TextInputPropsEx } from "../organisms/common/CommonOneBlockTeeth";

export default function TextInputSmallMolecular(props: TextInputPropsEx) {
  return (
    <TextInputAtom {...props} keyboardType={"phone-pad"} style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {},
});
