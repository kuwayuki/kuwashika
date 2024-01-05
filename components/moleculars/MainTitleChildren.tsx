import { StyleSheet, TextProps, View } from "react-native";
import TextAtom from "../atoms/TextAtom";

type TitleAndActionProps = TextProps & {
  title?: string;
};

export default function MainTitleChildren(props: TitleAndActionProps) {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
        props.style,
      ]}
    >
      <TextAtom style={{ fontSize: 20 }}>{props.title}</TextAtom>
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({});
