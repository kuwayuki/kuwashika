import * as React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

const ScrollViewAtom = React.forwardRef((props: ScrollViewProps, ref: any) => {
  React.useEffect(() => {
    if (!ref) return;
    ref.current.scrollTo({ x: 1, y: 1 });
  }, []);

  return (
    <ScrollView
      {...props}
      style={styles.scrollView}
      ref={ref}
      horizontal={false}
      decelerationRate={"normal"}
      maximumZoomScale={2}
      minimumZoomScale={0.5}
    >
      {props.children}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    minHeight: "70%",
    marginHorizontal: 10,
    backgroundColor: "#FFFFEE",
  },
});

export default ScrollViewAtom;
