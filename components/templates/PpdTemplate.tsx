import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AppContext } from "../../App";
import { TEETH_ALL } from "../../constants/Constant";
import CommonBottomButton from "../organisms/common/CommonBottomButton";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";
import { PPD_PARTS } from "../organisms/ppd/PpdOneSideTeeth";
import { PpdContext } from "../pages/PpdPage";

export default function PpdTemplate() {
  const appContext = React.useContext(AppContext);
  const ppdContext = React.useContext(PpdContext);

  const scrollViewRef = React.useRef<ScrollView>(null);

  const moveScroll = (index?: number) => {
    if (scrollViewRef.current) {
      const num = index ?? ppdContext.focusNumber;
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
    <>
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
        focusNumber={ppdContext.focusNumber}
        setFocusNumber={ppdContext.setFocusNumber}
        teethValues={
          appContext.isPrecision
            ? ppdContext.teethValues
            : ppdContext.teethValuesSimple
        }
        setTeethValue={
          appContext.isPrecision
            ? ppdContext.setTeethValue
            : ppdContext.setTeethValueSimple
        }
        moveScroll={moveScroll}
        pressedValue={ppdContext.pressedValue}
        setPressedValue={ppdContext.setPressedValue}
        mtTeethNums={ppdContext.mtTeethNums}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 25,
  },
  scrollView: {
    minHeight: "70%",
    marginHorizontal: 10,
    backgroundColor: "#FFFFEE",
  },
});
