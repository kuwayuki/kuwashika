import * as React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { isAndroid } from "../../constants/Util";

const ScrollViewAtom = React.forwardRef((props: ScrollViewProps, ref: any) => {
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
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    height: 0,
    // minHeight: "70%",
    backgroundColor: "#FFFFEE",
  },
});

export default ScrollViewAtom;
