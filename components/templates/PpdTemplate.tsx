import * as React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { AppContext } from "../../App";
import ScrollViewAtom from "../atoms/ScrollViewAtom";
import CommonBottomButton from "../organisms/common/CommonBottomButton";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";
import { PpdContext } from "../pages/PpdPage";

export default function PpdTemplate() {
  const appContext = React.useContext(AppContext);
  const ppdContext = React.useContext(PpdContext);
  const partsTimesX = appContext.isPrecision ? 3 : 1;
  const partsTimesY = appContext.isPrecision ? 4 : 2;
  const maxColumns = 16 * partsTimesX;

  const scrollViewRef = React.useRef(null);
  let nativeEvent: NativeScrollEvent = {
    zoomScale: 1,
    contentSize: { width: 1823, height: 232 },
    layoutMeasurement: { width: 799, height: 185 },
  } as NativeScrollEvent;

  const moveScroll = (index?: number) => {
    if (scrollViewRef.current) {
      const num = index ?? ppdContext.focusNumber;
      const pointPositionX = Math.floor(num % maxColumns);
      const pointPositionY = Math.floor(num / maxColumns);
      const bornusX =
        (nativeEvent.layoutMeasurement.width / 2) * nativeEvent.zoomScale;
      const bornusY =
        nativeEvent.layoutMeasurement.height * nativeEvent.zoomScale;
      const positionX =
        (nativeEvent.contentSize.width / maxColumns) * pointPositionX - bornusX;
      const positionY =
        (nativeEvent.contentSize.height / partsTimesY) * pointPositionY +
        (pointPositionY < partsTimesY / 2 ? -bornusY : bornusY);

      scrollViewRef.current.scrollTo({ x: positionX, y: positionY });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event) return;
    nativeEvent = event.nativeEvent;
  };

  return (
    <>
      <View style={styles.container}>
        <CommonInfoInput />
        <ScrollViewAtom ref={scrollViewRef} onScroll={handleScroll}>
          <PpdAllTeeth />
        </ScrollViewAtom>
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
        mtTeethNums={appContext.mtTeethNums}
        isPrecision={appContext.isPrecision}
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
});
