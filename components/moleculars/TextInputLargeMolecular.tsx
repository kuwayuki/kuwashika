import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import { MATH } from "./TextInputTeethMolecular";
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
