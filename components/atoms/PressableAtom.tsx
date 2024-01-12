import { useContext, useEffect, useState } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

export type PressablePropsType = PressableProps & {
  value: string;
};
export default function PressableAtom(props: PressablePropsType) {
  return (
    <Pressable style={props.style} onPress={props.onPress}>
      <Text style={styles.text}>{props.value}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
  button: {
    fontWeight: "bold",
    borderWidth: 0.4,
    textAlignVertical: "middle",
    alignItems: "center",
    padding: 15,
  },
});
