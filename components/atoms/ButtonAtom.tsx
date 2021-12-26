import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export enum PRESS {
  NORMAL,
  PRESSED,
}

export default function ButtonAtom(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.style,
        props.disabled && { backgroundColor: "#555555" },
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
  button: {
    fontWeight: "bold",
    borderWidth: 0.3,
    textAlignVertical: "middle",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    padding: 15,
  },
});
