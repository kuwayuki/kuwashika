import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import TextInputMolecularPcr from "./TextInputMolecularPcr";
import { TEETH_MATH } from "./TextInputTeethMolecular";

export type PcrTextInputPropsEx = TextInputPropsEx & { groupIndex: number };
export default function TextInputPcrMolecular(props: PcrTextInputPropsEx) {
  const len = TEETH_MATH * 2;
  const isFocus =
    props.teethValue !== undefined &&
    props.teethValue.index === props.focusNumber;
  const teethIndex = props.groupIndex * 4;

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
        teethValue={props.teethValue ? props.teethValue[teethIndex] : undefined}
        groupIndex={0}
        keyboardType={"phone-pad"}
      />
      <TextInputMolecularPcr
        {...props}
        teethValue={
          props.teethValue ? props.teethValue[teethIndex + 1] : undefined
        }
        groupIndex={1}
        keyboardType={"phone-pad"}
      />
      <TextInputMolecularPcr
        {...props}
        teethValue={
          props.teethValue ? props.teethValue[teethIndex + 2] : undefined
        }
        groupIndex={2}
        keyboardType={"phone-pad"}
      />
      <TextInputMolecularPcr
        {...props}
        teethValue={
          props.teethValue ? props.teethValue[teethIndex + 3] : undefined
        }
        groupIndex={3}
        keyboardType={"phone-pad"}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
