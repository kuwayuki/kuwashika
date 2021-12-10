import * as React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { AppContext } from "../../App";

const ScrollViewAtom = React.forwardRef((props: ScrollViewProps, ref: any) => {
  const appContext = React.useContext(AppContext);

  React.useEffect(() => {
    if (!ref) return;
    ref.current.scrollTo({ x: 1, y: 1 });
  }, [
    appContext.patientNumber,
    appContext.inspectionDataNumber,
    appContext.isPrecision,
  ]);

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
