import { StyleSheet } from "react-native";
import { teethGroupProps } from "../../constants/Constant";
import { isAndroid } from "../../constants/Util";
import TextInputMolecular from "./TextInputMolecular";
import { TEETH_MATH } from "./TextInputTeethMolecular";

export default function TextReadMolecular(props: teethGroupProps) {
  return (
    <TextInputMolecular {...props} editable={false} style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: TEETH_MATH * 2,
    height: TEETH_MATH,
    fontWeight: "bold",
    marginLeft: isAndroid() ? 0.1 : undefined, // Androidはなぜか設定しないとずれる
  },
});
