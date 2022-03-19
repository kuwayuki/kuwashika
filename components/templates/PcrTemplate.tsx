import * as React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { AppContextState } from "../../App";
import { TAB_PAGE } from "../../constants/Constant";
import { getScrollPosition, isAndroid } from "../../constants/Util";
import ScrollViewAtom from "../atoms/ScrollViewAtom";
import ScrollViewAndroid from "../moleculars/ScrollViewAndroid";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import PcrAllTeeth from "../organisms/pcr/PcrAllTeeth";
import { PcrContextState } from "../pages/PcrPage";

export default function PcrTemplate() {
  const appContext = React.useContext(AppContextState);
  const pcrContextState = React.useContext(PcrContextState);
  const [isScrollFocus, setScrollFocus] = React.useState(true);
  const [nativeEvent, setNativeEvent] = React.useState<NativeScrollEvent>({
    zoomScale: 1.24,
    contentSize: { width: 1823, height: 232 },
    layoutMeasurement: { width: 799, height: 185 },
  } as NativeScrollEvent);
  const scrollViewRef = React.useRef(null);
  const scrollViewAndroidRef = isAndroid() ? React.useRef(null) : undefined;

  // 初期データ読込処理
  React.useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0 });
    scrollViewAndroidRef?.current?.scrollTo({ x: 0, y: 0 });
  }, [appContext.patientNumber, appContext.inspectionDataNumber]);

  // 初期データ読込処理
  React.useEffect(() => {
    // 自動移動しない
    if (!appContext.settingData.setting.isPcrAutoMove) return;

    // スクロール中はフォーカス移動しない
    if (!isScrollFocus || pcrContextState.focusNumber === undefined) return;
    moveScroll(pcrContextState.focusNumber / 4);
  }, [pcrContextState.focusNumber]);

  const moveScroll = (index?: number) => {
    if (scrollViewRef.current) {
      const position = getScrollPosition(
        nativeEvent,
        index ?? pcrContextState.focusNumber,
        false
      );
      scrollViewRef.current.scrollTo({ ...position });
      scrollViewAndroidRef?.current?.scrollTo({ ...position });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event || nativeEvent.zoomScale === event.nativeEvent.zoomScale) return;
    setNativeEvent(event.nativeEvent);
  };

  return (
    <>
      <View style={styles.container}>
        <CommonInfoInput tabPage={TAB_PAGE.PCR} />
        <ScrollViewAtom
          ref={scrollViewRef}
          onScroll={handleScroll}
          onScrollBeginDrag={() => setScrollFocus(false)}
          onScrollEndDrag={() => setScrollFocus(true)}
          zoomScale={1.24}
        >
          {isAndroid() ? (
            <ScrollViewAndroid
              ref={scrollViewAndroidRef}
              onScroll={handleScroll}
              onScrollEndDrag={handleScroll}
            >
              <PcrAllTeeth />
            </ScrollViewAndroid>
          ) : (
            <PcrAllTeeth />
          )}
        </ScrollViewAtom>
      </View>
      {/* <CommonBottomButton
        tabPage={TAB_PAGE.PCR}
        focusNumber={pcrContext.focusNumber}
        setFocusNumber={pcrContext.setFocusNumber}
        teethValues={
          appContext.isPrecision
            ? pcrContext.teethValues
            : pcrContext.teethValuesSimple
        }
        setTeethValue={pcrContext.setTeethValue}
        moveScroll={moveScroll}
        mtTeethNums={appContext.mtTeethNums}
        isPrecision={appContext.isPrecision}
      /> */}
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
