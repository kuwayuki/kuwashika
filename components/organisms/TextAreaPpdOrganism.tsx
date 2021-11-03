import * as React from "react";
import { StyleSheet, View } from "react-native";
import TextAreaMolecular from "../moleculars/TextAreaMolecular";

/**
 * 横3マス x 縦２マス
 * @returns
 */
export default function TextAreaPpdOrganism() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        // borderWidth: 1,
        padding: 0,
      }}
    >
      <TextAreaMolecular />
      <TextAreaMolecular />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minWidth: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
});
