import * as React from "react";
import { StyleSheet, View } from "react-native";
import TextReadAtom from "../atoms/TextReadAtom";
import TextAreaMolecular from "../moleculars/TextAreaMolecular";
import TextAreaPpdOrganism from "./TextAreaPpdOrganism";

export type Num = {
  num: number;
};
export default function CommonArea(num: Num) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        // borderWidth: 1,
        padding: 0,
      }}
    >
      <TextAreaPpdOrganism />
      <TextReadAtom num={num.num} />
      <TextReadAtom num={num.num} />
      <TextAreaPpdOrganism />
    </View>
  );
}
