import * as React from "react";
import { StyleSheet, View } from "react-native";
import TextInputAtom from "../atoms/TextInputAtom";

/**
 * 横３マス
 * @returns
 */
export default function TextAreaMolecular() {
  const [text, onChangeText] = React.useState("");
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        // borderWidth: 1,
        padding: 0,
      }}
    >
      <TextInputAtom onChangeText={onChangeText} value={text} />
      <TextInputAtom onChangeText={onChangeText} value={text} />
      <TextInputAtom onChangeText={onChangeText} value={text} />
    </View>
  );
}
