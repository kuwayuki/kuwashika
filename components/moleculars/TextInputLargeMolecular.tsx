import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import { TEETH_MATH } from "./TextInputTeethMolecular";
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
    width: TEETH_MATH * 3,
    height: TEETH_MATH * 2,
  },
});
