import { StyleSheet, View } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import TextInputMolecularPcr from "./TextInputMolecularPcr";
import { TEETH_MATH } from "./TextInputTeethMolecular";

export type PcrTextInputPropsEx = TextInputPropsEx & { pcrIndex?: number }; // pcrIndex: [0, 1, 2, 3], [4, 5, 6, 7]...
const MATH_4 = [0, 1, 2, 3];
export default function TextInputPcrMolecular(props: PcrTextInputPropsEx) {
  const len = TEETH_MATH * 2;
  const isFocus =
    props.teethValue !== undefined &&
    props.teethValue.index === props.focusNumber;
  const teethIndex = props.teethGroupIndex * 4;

  return (
    <View
      // style={[props.style, getStatusColorStyle()]}
      style={{
        overflow: "hidden",
        maxWidth: len,
        maxHeight: len,
        minWidth: len,
        minHeight: len,
      }}
    >
      {MATH_4.map((math) => (
        <TextInputMolecularPcr
          {...props}
          teethValue={
            props.teethValue ? props.teethValue[teethIndex + math] : undefined
          }
          pcrIndex={teethIndex + math}
          keyboardType={"phone-pad"}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
