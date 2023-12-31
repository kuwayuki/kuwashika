import * as React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

const ScrollViewAtom = React.forwardRef((props: ScrollViewProps, ref: any) => {
  return (
    <ScrollView
      {...props}
      style={styles.scrollView}
      ref={ref}
      horizontal={false}
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
    minHeight: "80%",
    marginHorizontal: 10,
    backgroundColor: "#FFFFEE",
  },
});

export default ScrollViewAtom;
