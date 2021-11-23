import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AppContext } from "../../App";
import { MATH } from "../moleculars/TextInputTeethMolecular";
import CommonBottomButton from "../organisms/common/CommonBottomButton";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";
import { PPD_PARTS } from "../organisms/common/CommonTeeth";
import { PpdContext } from "../pages/PpdPage";

export default function PpdTemplate() {
  const appContext = React.useContext(AppContext);
  const ppdContext = React.useContext(PpdContext);

  const scrollViewRef = React.useRef<ScrollView>(null);

  const moveScroll = (index?: number) => {
    if (scrollViewRef.current) {
      const num = index ?? ppdContext.focusNumber;
      const psotionX = Math.floor(num % (16 * PPD_PARTS.length));
      const psotionY = Math.floor(num / (16 * PPD_PARTS.length));
      scrollViewRef.current.scrollTo({
        x: Math.floor(psotionX * MATH - (36 - psotionX) * (MATH / 4)), // 真ん中に近づくにつれて、移動距離を変える
        y: Math.floor(psotionY * MATH - (2 - psotionY) * MATH),
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
        setTeethValue={ppdContext.setTeethValue}
        moveScroll={() => moveScroll(ppdContext.focusNumber)}
        pressedValue={ppdContext.pressedValue}
        setPressedValue={ppdContext.setPressedValue}
        mtTeethNums={appContext.mtTeethNums}
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
