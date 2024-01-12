import { StyleSheet } from "react-native";
import { TextInputPropsEx } from "../../constants/Constant";
import TextInputMolecular from "./TextInputMolecular";
import { TEETH_MATH } from "./TextInputTeethMolecular";

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
    width: TEETH_MATH * 2,
    height: TEETH_MATH * 2,
  },
});
