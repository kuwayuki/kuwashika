import * as React from "react";
import { StyleSheet, TextProps, View } from "react-native";
import TextAtom from "../atoms/TextAtom";

type TitleAndActionProps = TextProps & {
  title?: string;
};

export default function TitleAndAction(props: TitleAndActionProps) {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 8,
          // maxWidth: 150,
          // justifyContent: "flex-start",
          // paddingLeft: 40,
        },
        props.style,
      ]}
    >
      <TextAtom style={{ paddingRight: 4, textAlignVertical: "center" }}>
        {props.title}
      </TextAtom>
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({});
