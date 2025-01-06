import { Text, TextThmedProps } from "../organisms/common/Themed";

export function MonoText(props: TextThmedProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
