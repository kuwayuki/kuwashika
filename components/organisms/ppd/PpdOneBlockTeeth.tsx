import * as React from "react";
import { View } from "react-native";
import PpdOneSideTeeth, { teethProps } from "./PpdOneSideTeeth";

/**
 * 横3マス x 縦２マス
 * @returns
 */
export default function PpdOneBlockTeeth(props: teethProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PpdOneSideTeeth {...props} teethRows={props.teethRows * 2 + 0} />
      <PpdOneSideTeeth {...props} teethRows={props.teethRows * 2 + 1} />
    </View>
  );
}
