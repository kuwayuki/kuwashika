import { forwardRef } from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

const ScrollViewAndroid = forwardRef((props: ScrollViewProps, ref: any) => {
  return (
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
      {props.children}
    </ScrollView>
  );
});

const styles = StyleSheet.create({});

export default ScrollViewAndroid;
