// import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { forwardRef } from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";

const ZoomableViewAtom = forwardRef(
  (props: ScrollViewProps, scrollViewRef: any) => {
    return (
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        horizontal={true}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={true}
        decelerationRate={"normal"}
      >
        {props.children}
        {/* <ReactNativeZoomableView
          zoomEnabled={true}
          ref={scrollViewRef}
          maxZoom={1.5}
          minZoom={0.5}
          initialZoom={1}
          bindToBorders={true}
          // onZoomAfter={this.logOutZoomState}
          style={styles.scrollView}
        >
          {props.children}
        </ReactNativeZoomableView> */}
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height: 0,
    minHeight: "80%",
    backgroundColor: "#FFFFEE",
  },
});

export default ZoomableViewAtom;
