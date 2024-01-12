import { View } from "react-native";
import CommonTeeth, { teethProps } from "../common/CommonTeeth";

export default function UpsetOneBlockTeeth(props: teethProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CommonTeeth {...props} teethRows={props.teethRows} />
    </View>
  );
}
