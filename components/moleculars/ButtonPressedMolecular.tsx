import * as React from "react";
import { StyleSheet, TouchableOpacityProps } from "react-native";
import ButtonAtom from "../atoms/ButtonAtom";

export default function ButtonPressedMolecular(props: TouchableOpacityProps) {
  return <ButtonAtom {...props} />;
}
const styles = StyleSheet.create({});
