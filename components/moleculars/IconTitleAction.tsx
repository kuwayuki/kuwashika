import * as React from "react";
import { StyleSheet, TextProps, View } from "react-native";
import TextAtom from "../atoms/TextAtom";

type TitleAndActionProps = TextProps & {
  title?: string;
  icon?: React.ReactFragment;
};

export default function IconTitleAction(props: TitleAndActionProps) {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // borderBottomWidth: 1,
        },
        props.style,
      ]}
    >
      {props.icon}
      <TextAtom
        style={{ paddingRight: 4, textAlignVertical: "center", fontSize: 18 }}
      >
        {props.title}
      </TextAtom>
      <View style={{ flexGrow: 1 }}></View>
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({});
