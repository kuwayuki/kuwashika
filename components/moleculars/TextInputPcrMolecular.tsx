import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import TextInputMolecularPcr from "./TextInputMolecularPcr";
import { TEETH_MATH } from "./TextInputTeethMolecular";

export type PcrTextInputPropsEx = TextInputPropsEx & { index: number };
export default function TextInputPcrMolecular(props: PcrTextInputPropsEx) {
  const len = TEETH_MATH * 2;
  const isFocus =
    props.teethValue !== undefined &&
    props.teethValue.index === props.focusNumber;

  return (
    <View
      // style={[props.style, getStatusColorStyle()]}
      style={{
        overflow: "hidden",
        maxWidth: len,
        maxHeight: len,
        minWidth: len,
        minHeight: len,
        // borderColor: "#696969",
        // backgroundColor: "#696969",
        borderWidth: isFocus ? 2 : 0.5,
      }}
    >
      <TextInputMolecularPcr
        {...props}
        index={0}
        keyboardType={"phone-pad"}
        style={styles.input}
      />
      <TextInputMolecularPcr
        {...props}
        index={1}
        keyboardType={"phone-pad"}
        style={styles.input}
      />
      <TextInputMolecularPcr
        {...props}
        index={2}
        keyboardType={"phone-pad"}
        style={styles.input}
      />
      <TextInputMolecularPcr
        {...props}
        index={3}
        keyboardType={"phone-pad"}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "transparent",
  },
});
