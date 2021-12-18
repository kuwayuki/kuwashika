import * as React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { AppContext } from "../../App";
import { TAB_PAGE } from "../../constants/Constant";
import { getScrollPosition } from "../../constants/Util";
import ScrollViewAtom from "../atoms/ScrollViewAtom";
import { TEETH_MATH } from "../moleculars/TextInputTeethMolecular";
import CommonBottomButton from "../organisms/common/CommonBottomButton";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import UpsetAllTeeth from "../organisms/upset/UpsetAllTeeth";
import { UpsetContext } from "../pages/UpsetPage";

export default function UpsetTemplate() {
  const appContext = React.useContext(AppContext);
  const upsetContext = React.useContext(UpsetContext);
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
        index ?? upsetContext.focusNumber
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
        <CommonInfoInput tabPage={TAB_PAGE.UPSET} />
        <ScrollViewAtom
          ref={scrollViewRef}
          onScroll={handleScroll}
          onScrollEndDrag={handleScroll}
        >
          <UpsetAllTeeth />
        </ScrollViewAtom>
      </View>
      {
        <CommonBottomButton
          tabPage={TAB_PAGE.UPSET}
          focusNumber={upsetContext.focusNumber}
          setFocusNumber={upsetContext.setFocusNumber}
          teethValues={upsetContext.teethValuesSimple}
          setTeethValue={upsetContext.setTeethValue}
          moveScroll={moveScroll}
          mtTeethNums={appContext.mtTeethNums}
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
