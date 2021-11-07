import * as React from "react";
import { StyleSheet, Switch } from "react-native";
import { SwitchProps } from "react-native-elements";

export default function SwitchAtom(props: SwitchProps) {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <Switch
      {...props}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
    />
  );
}
const styles = StyleSheet.create({
  base: {},
});
