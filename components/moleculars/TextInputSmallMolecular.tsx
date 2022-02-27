import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import { isAndroid } from "../../constants/Util";
import TextInputMolecular from "./TextInputMolecular";
import { TEETH_MATH } from "./TextInputTeethMolecular";

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
  input: {
    width: TEETH_MATH * (2 / 3),
    height: TEETH_MATH * 1,
    paddingLeft: isAndroid() ? 8 : undefined,
  },
});
