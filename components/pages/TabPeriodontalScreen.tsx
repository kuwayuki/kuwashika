import * as React from "react";
import { StyleSheet } from "react-native";
import { RootTabScreenProps } from "../../types";
import CommonArea from "../organisms/CommonArea";
import PpdArea from "../organisms/PpdArea";
import TextAreaPpdOrganism from "../organisms/TextAreaPpdOrganism";
import { View } from "../organisms/Themed";

export default function TabPeriodontalScreen({
  navigation,
}: RootTabScreenProps<"TabPeriodontal">) {
  const [text, onChangeText] = React.useState("Useless Text");
  return (
    <>
      <View style={styles.container}>
        <PpdArea />
        {/* <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}
        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
