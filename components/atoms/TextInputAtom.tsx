import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";
import { isAndroid } from "../../constants/Util";

type TextInputAtomType = TextInputProps & { isTextInput?: boolean };
export default function TextInputAtom(props: TextInputAtomType) {
  return isAndroid() && !props.isTextInput ? (
    <Text {...props} style={[styles.base, props.style]}>
      {props.value}
    </Text>
  ) : (
    <TextInput {...props} style={[styles.base, props.style]} />
  );
}

const styles = StyleSheet.create({
  base: {
    width: 160,
    borderWidth: 1,
    padding: 2,
  },
});
