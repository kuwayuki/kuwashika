import * as React from "react";
import { View } from "react-native";
import { AppContext } from "../../../App";
import PpdOneSideTeeth, { teethProps } from "./PpdOneSideTeeth";

export default function PpdOneBlockTeeth(props: teethProps) {
  const appContext = React.useContext(AppContext);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 上段 or 下段の1列目 */}
      <PpdOneSideTeeth
        {...props}
        teethRows={props.teethRows * (appContext.isPrecision ? 2 : 1)}
      />
      {appContext.isPrecision && (
        /* 「精密のみ」：上段 or 下段の２列目 */
        <PpdOneSideTeeth {...props} teethRows={props.teethRows * 2 + 1} />
      )}
    </View>
  );
}
