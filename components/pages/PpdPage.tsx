import * as React from "react";
import { StyleSheet } from "react-native";
import { RootTabScreenProps } from "../../types";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";

export type ppdContext = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  textInputsFocus: any[];
};
export const PpdContext = React.createContext({} as ppdContext);

export default function PpdPage({
  navigation,
}: RootTabScreenProps<"TabPeriodontal">) {
  const [text, onChangeText] = React.useState("Useless Text");
  const [focusNumber, setFocusNumber] = React.useState(0);
  let textInputsFocus: any = null;
  return (
    <PpdContext.Provider
      value={{ focusNumber, setFocusNumber, textInputsFocus }}
    >
      <View style={styles.container}>
        <PpdAllTeeth />
        {/* <PpdAllTeeth /> */}
        {/* <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}
        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      </View>
    </PpdContext.Provider>
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
