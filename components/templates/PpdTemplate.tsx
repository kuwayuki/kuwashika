import * as React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { AppContextState } from "../../App";
import { TAB_PAGE } from "../../constants/Constant";
import { getScrollPosition } from "../../constants/Util";
import ScrollViewAtom from "../atoms/ScrollViewAtom";
import CommonBottomButton from "../organisms/common/CommonBottomButton";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";
import { PpdContext } from "../pages/PpdPage";

export default function PpdTemplate() {
  const appContext = React.useContext(AppContextState);
  const ppdContext = React.useContext(PpdContext);
  const [nativeEvent, setNativeEvent] = React.useState<NativeScrollEvent>({
    zoomScale: 0.99,
    contentSize: { width: 1823, height: 232 },
    layoutMeasurement: { width: 799, height: 185 },
  } as NativeScrollEvent);
  const scrollViewRef = React.useRef(null);

  // 初期データ読込処理
  React.useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0 });
  }, [appContext.patientNumber, appContext.inspectionDataNumber]);

  const moveScroll = (index?: number) => {
    if (scrollViewRef.current) {
      const position = getScrollPosition(
        nativeEvent,
        index ?? ppdContext.focusNumber,
        appContext.isPrecision
      );
      scrollViewRef.current.scrollTo({ ...position });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event || nativeEvent.zoomScale === event.nativeEvent.zoomScale) return;
    setNativeEvent(event.nativeEvent);
  };

  return (
    <>
      <View style={styles.container}>
        <CommonInfoInput tabPage={TAB_PAGE.PPD} />
        <ScrollViewAtom
          ref={scrollViewRef}
          onScroll={handleScroll}
          onScrollEndDrag={handleScroll}
        >
          <PpdAllTeeth />
        </ScrollViewAtom>
      </View>
      {
        <CommonBottomButton
          tabPage={TAB_PAGE.PPD}
          focusNumber={ppdContext.focusNumber}
          setFocusNumber={ppdContext.setFocusNumber}
          teethValues={
            appContext.isPrecision
              ? ppdContext.teethValues
              : ppdContext.teethValuesSimple
          }
          setTeethValue={ppdContext.setTeethValue}
          moveScroll={moveScroll}
          mtTeethNums={appContext.mtTeethNums}
          isPrecision={appContext.isPrecision}
        />
      }
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
