import * as React from "react";
import { View } from "react-native";
import { AppContext } from "../../../App";
import CommonTeeth, { teethProps } from "../common/CommonTeeth";

export default function PcrOneBlockTeeth(props: teethProps) {
  const appContext = React.useContext(AppContext);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 上段 or 下段の1列目 */}
      <CommonTeeth
        {...props}
        teethRows={props.teethRows * (appContext.isPrecision ? 2 : 1)}
        isPcr={true}
      />
    </View>
  );
}
// {appContext.isPrecision && (
//   /* 「精密のみ」：上段 or 下段の２列目 */
//   <CommonTeeth
//     {...props}
//     teethRows={props.teethRows * 2 + 1}
//     isPcr={true}
//   />
// )}
