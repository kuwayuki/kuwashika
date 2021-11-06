import * as React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export default function TextAtom(props: TextProps) {
  return (
    <Text {...props} style={[styles.base, props.style]}>
      {props.children}
    </Text>
  );
}
const styles = StyleSheet.create({
  base: {
    padding: 0,
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
    textAlign: "center",
  },
});
