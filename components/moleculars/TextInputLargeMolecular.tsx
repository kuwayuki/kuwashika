import * as React from "react";
import { StyleSheet } from "react-native";
import { MATH } from "../atoms/TextInputAtom";
import { TextInputPropsEx } from "../organisms/common/CommonOneBlockTeeth";
import TextInputMolecular from "./TextInputMolecular";

export default function TextInputLargeMolecular(props: TextInputPropsEx) {
  return (
    <TextInputMolecular
      {...props}
      keyboardType={"phone-pad"}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: MATH * 3,
    height: MATH * 2,
  },
});
