import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TEETH_ALL, TEETH_TYPE } from "../../constants/Constant";
import { RootTabScreenProps } from "../../types";
import CommonBottomButton from "../organisms/common/CommonBottomButton";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";
import { PPD_PARTS } from "../organisms/ppd/PpdOneSideTeeth";

export type ppdContext = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  textInputs: any[];
  setTextInputs: (textInputsFocus: any[]) => void;
  teethValues: TEETH_TYPE[];
  setTeethValues: (teethValues: TEETH_TYPE[]) => void;
  setTeethValue: (index: number, teethValue: TEETH_TYPE) => void;
  mtTeethNums: number[];
  setMtTeethNums: (mtTeethNums: number[]) => void;
  pressedValue: number;
  setPressedValue: (pressedValue: number) => void;
};
export const PpdContext = React.createContext({} as ppdContext);

export default function PpdPage({
  navigation,
}: RootTabScreenProps<"TabPeriodontal">) {
  const [focusNumber, setFocusNumber] = React.useState(0);
  const [textInputs, setTextInputs] = React.useState<any[]>([]);
  const [mtTeethNums, setMtTeethNums] = React.useState<number[]>([]);
  const [teethValues, setTeethValues] = React.useState<TEETH_TYPE[]>([]);
  const [pressedValue, setPressedValue] = React.useState(-1);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const setTeethValue = (index: number, teethValue: TEETH_TYPE) => {
    const temp = [...teethValues];
    if (teethValue.value < 10) {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
        display: teethValue.value.toString(),
      } as TEETH_TYPE;
    } else if (teethValue.value === 10) {
      const plus =
        temp[index] && temp[index].value
          ? temp[index].value + 1
          : teethValue.value;
      temp[index] = {
        ...teethValue,
        value: plus,
        display: plus.toString(),
      } as TEETH_TYPE;
    } else {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
        display: "",
      } as TEETH_TYPE;
    }
    setTeethValues([...temp]);
  };

  const moveScroll = (index?: number) => {
    if (scrollViewRef.current) {
      const num = index ?? focusNumber;
      const psotionX = num % (TEETH_ALL.length * PPD_PARTS.length);
      const psotionY = num / (TEETH_ALL.length * PPD_PARTS.length);
      scrollViewRef.current.scrollTo({
        x: psotionX * 20,
        y: psotionY * 10,
        animated: false,
      });
    }
  };
  return (
    <PpdContext.Provider
      value={{
        focusNumber,
        setFocusNumber,
        textInputs,
        setTextInputs,
        teethValues,
        setTeethValues,
        setTeethValue,
        mtTeethNums,
        setMtTeethNums,
        pressedValue,
        setPressedValue,
      }}
    >
      <View style={styles.container}>
        <CommonInfoInput />
        <ScrollView
          style={styles.scrollView}
          horizontal={false}
          decelerationRate={"normal"}
          ref={scrollViewRef}
          maximumZoomScale={4}
          minimumZoomScale={0.5}
        >
          <PpdAllTeeth />
        </ScrollView>
      </View>
      <CommonBottomButton
        focusNumber={focusNumber}
        setFocusNumber={setFocusNumber}
        setTeethValue={setTeethValue}
        moveScroll={moveScroll}
        pressedValue={pressedValue}
        setPressedValue={setPressedValue}
      />
    </PpdContext.Provider>
  );
}

const styles = StyleSheet.create({
  keyboard: {},
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
