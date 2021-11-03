import * as React from "react";
import { StyleSheet, View } from "react-native";
import TextReadAtom from "../atoms/TextReadAtom";
import TextAreaMolecular from "../moleculars/TextAreaMolecular";
import CommonArea from "./CommonArea";
import TextAreaPpdOrganism from "./TextAreaPpdOrganism";

export default function PpdArea() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        // borderWidth: 1,
        padding: 0,
      }}
    >
      <CommonArea num={8} />
      <CommonArea num={7} />
      <CommonArea num={6} />
      <CommonArea num={5} />
      <CommonArea num={4} />
      <CommonArea num={3} />
      <CommonArea num={2} />
      <CommonArea num={1} />

      <CommonArea num={1} />
      <CommonArea num={2} />
      <CommonArea num={3} />
      <CommonArea num={4} />
      <CommonArea num={5} />
      <CommonArea num={6} />
      <CommonArea num={7} />
      <CommonArea num={8} />
    </View>
  );
}
