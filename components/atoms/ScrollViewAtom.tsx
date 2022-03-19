import * as React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { isAndroid } from "../../constants/Util";

const ScrollViewAtom = React.forwardRef((props: ScrollViewProps, ref: any) => {
  const androidScroll = (children: React.ReactNode) => (
    // <ReactNativeZoomableView
    //   zoomEnabled={true}
    //   ref={ref}
    //   maxZoom={1.5}
    //   minZoom={0.5}
    //   initialZoom={1}
    //   bindToBorders={true}
    //   // onZoomAfter={this.logOutZoomState}
    //   // style={styles.zoomableView}
    // >
    // </ReactNativeZoomableView>
    <ScrollView
      {...props}
      horizontal={false}
      ref={ref}
      persistentScrollbar={true}
      showsVerticalScrollIndicator={true}
      decelerationRate={"normal"}
      maximumZoomScale={3}
      minimumZoomScale={0.5}
    >
      {children}
    </ScrollView>
  );

  return (
    <ScrollView
      {...props}
      style={styles.scrollView}
      ref={ref}
      horizontal={isAndroid()}
      persistentScrollbar={true}
      showsVerticalScrollIndicator={true}
      decelerationRate={"normal"}
      maximumZoomScale={3}
      minimumZoomScale={0.5}
    >
      {props.children}
      {/* {isAndroid() ? androidScroll(props.children) : props.children} */}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height: 0,
    // maxHeight: "20%",
    minHeight: "80%",
    backgroundColor: "#FFFFEE",
  },
});

export default ScrollViewAtom;
