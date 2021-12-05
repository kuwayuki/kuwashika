import * as React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { AppContext } from "../../App";
import { TAB_PAGE } from "../../constants/Constant";
import ScrollViewAtom from "../atoms/ScrollViewAtom";
import { TEETH_MATH } from "../moleculars/TextInputTeethMolecular";
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
  const MAX_WIDTH = 48 * TEETH_MATH;
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
      const num = index ?? ppdContext.focusNumber;
      // 左から何番目？
      let indexPositionX = Math.floor(num % maxColumns);
      if (indexPositionX > 0) indexPositionX++;
      // 上から何番目？
      const indexPositionY = Math.floor(num / maxColumns);

      // 一マス分のサイズ
      const timesX = (MAX_WIDTH * nativeEvent.zoomScale) / maxColumns;
      const bornusY =
        nativeEvent.layoutMeasurement.height * nativeEvent.zoomScale;
      // 端っこに行くにつれて差分を徐々に倍率を下げる（真ん中が最大）
      const positionX =
        timesX * indexPositionX -
        (nativeEvent.zoomScale >= 1 ? 300 : 100 * nativeEvent.zoomScale);
      const positionY =
        (nativeEvent.contentSize.height / partsTimesY) * indexPositionY +
        (indexPositionY < partsTimesY / 2 ? -bornusY : bornusY);
      scrollViewRef.current.scrollTo({ x: positionX, y: positionY });
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
