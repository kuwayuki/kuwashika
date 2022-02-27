import * as React from "react";
import { Keyboard, StyleSheet } from "react-native";
import { teethGroupProps } from "../../constants/Constant";
import { TEETH_MATH } from "./TextInputTeethMolecular";
import TextInputMolecular from "./TextInputMolecular";
import { isAndroid } from "../../constants/Util";

export default function TextReadMolecular(props: teethGroupProps) {
  return (
    <TextInputMolecular
      {...props}
      editable={isAndroid()}
      onTouchEndCapture={() => Keyboard.dismiss()}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: TEETH_MATH * 2,
    height: TEETH_MATH,
    fontWeight: "bold",
  },
});
