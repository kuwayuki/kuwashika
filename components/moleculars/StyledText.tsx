import * as React from "react";

import { Text, TextProps } from "../organisms/common/Themed";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
