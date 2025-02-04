import { useContext, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { AppContextState } from "../../App";
import { BANNER_UNIT_ID, TAB_PAGE } from "../../constants/Constant";
import { getScrollPosition, isAndroid } from "../../constants/Util";
import ScrollViewAtom from "../atoms/ScrollViewAtom";
import ScrollViewAndroid from "../moleculars/ScrollViewAndroid";
import CommonBottomButton from "../organisms/common/CommonBottomButton";
import CommonInfoInput from "../organisms/common/CommonInfoInput";
import { View } from "../organisms/common/Themed";
import PpdAllTeeth from "../organisms/ppd/PpdAllTeeth";
import { PpdContextDispatch, PpdContextState } from "../pages/PpdPage";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

export default function PpdTemplate() {
  const appContext = useContext(AppContextState);
  const ppdContextState = useContext(PpdContextState);
  const ppdContextDispatch = useContext(PpdContextDispatch);
  const [nativeEvent, setNativeEvent] = useState<NativeScrollEvent>({
    zoomScale: 0.99,
    contentSize: { width: 1823, height: 232 },
    layoutMeasurement: { width: 799, height: 185 },
  } as NativeScrollEvent);
  const scrollViewRef = useRef(null);
  const scrollViewAndroidRef = isAndroid() ? useRef(null) : undefined;

  // 初期データ読込処理
  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0 });
    scrollViewAndroidRef?.current?.scrollTo({ x: 0, y: 0 });
  }, [appContext.patientNumber, appContext.inspectionDataNumber]);

  const moveScroll = (index?: number) => {
    if (scrollViewRef.current) {
      const position = getScrollPosition(
        nativeEvent,
        index ?? ppdContextState.focusNumber,
        appContext.isPrecision
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
        <CommonInfoInput tabPage={TAB_PAGE.PPD} />
        <ScrollViewAtom
          ref={scrollViewRef}
          onScroll={handleScroll}
          onScrollEndDrag={handleScroll}
        >
          {isAndroid() ? (
            <ScrollViewAndroid
              ref={scrollViewAndroidRef}
              onScroll={handleScroll}
              onScrollEndDrag={handleScroll}
            >
              <PpdAllTeeth />
            </ScrollViewAndroid>
          ) : (
            <PpdAllTeeth />
          )}
          {!appContext.isPremium && (
            <View
              style={{
                flexDirection: "row",
                width: 100,
              }}
            >
              <BannerAd
                unitId={BANNER_UNIT_ID.BANNER}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{ keywords: ["Dental Equipment"] }}
              />
              <BannerAd
                unitId={BANNER_UNIT_ID.BANNER_1}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{ keywords: ["Dental Insurance"] }}
              />
            </View>
          )}
        </ScrollViewAtom>
      </View>
      {
        <CommonBottomButton
          tabPage={TAB_PAGE.PPD}
          focusNumber={ppdContextState.focusNumber}
          setFocusNumber={ppdContextDispatch.setFocusNumber}
          teethValues={
            appContext.isPrecision
              ? ppdContextState.teethValues
              : ppdContextState.teethValuesSimple
          }
          setTeethValue={ppdContextDispatch.setTeethValue}
          moveScroll={moveScroll}
          mtTeethNums={appContext.mtTeethNums}
          isPrecision={appContext.isPrecision}
          moveEndAction={ppdContextDispatch.moveNavigation}
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
