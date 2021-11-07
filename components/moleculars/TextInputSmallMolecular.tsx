import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInputPropsEx } from "../organisms/common/CommonOneBlockTeeth";
import TextInputMolecular from "./TextInputMolecular";

export default function TextInputSmallMolecular(props: TextInputPropsEx) {
  return (
    <TextInputMolecular
      {...props}
      keyboardType={"phone-pad"}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {},
});
