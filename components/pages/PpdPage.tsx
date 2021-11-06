import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../../types";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import CommonBottomButton from "../organisms/common/CommonBottomButton";

export type ppdContext = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  textInputs: any[];
  setTextInputs: (textInputsFocus: any[]) => void;
  setFocus: (index: number) => void;
  setFocusRef: (index: number, ref: any) => void;
};
export const PpdContext = React.createContext({} as ppdContext);

export default function PpdPage({
  navigation,
}: RootTabScreenProps<"TabPeriodontal">) {
  const [text, onChangeText] = React.useState("Useless Text");
  const [focusNumber, setFocusNumber] = React.useState(0);
  const [textInputs, setTextInputs] = React.useState<any[]>([]);
  // const inputRefs = Array(4).fill(React.createRef());

  const setFocus = (index: number) => {
    const temp = [...textInputs];
    temp[index + 1].focus();
    setTextInputs(temp);
  };
  const setFocusRef = (index: number, ref: any) => {
    setTextInputs((textInput) => {
      const temp = [...textInputs];
      temp[index] = ref;
      return [...temp];
    });
  };

  return (
    <PpdContext.Provider
      value={{
        focusNumber,
        setFocusNumber,
        textInputs,
        setTextInputs,
        setFocus,
        setFocusRef,
      }}
    >
      <View style={styles.container}>
        {/* <View style={styles.zindex}> */}
        <CommonInfoInput />
        {/* <CommonBottomButton /> */}
        {/* </View> */}
        <ScrollView style={styles.scrollView}>
          <PpdAllTeeth />
          {/* <PpdAllTeeth /> */}
          {/* <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}
          {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
        </ScrollView>
        {/* <CommonInfoInput /> */}
      </View>
    </PpdContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zindex: {
    // height: 0,
    zIndex: 1000,
  },
  scrollView: {
    // height: "100%",
    minHeight: "70%",
    marginHorizontal: 10,
    backgroundColor: "#FFFFEE",
    // marginVertical: 30,
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
