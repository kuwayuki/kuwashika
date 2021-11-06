import * as Print from "expo-print";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import ButtonAtom from "../../atoms/ButtonAtom";

type buttonType = { value: number; display: string; color: string };

export const BUTTON_NAMES = [
  { value: 0 } as buttonType,
  { value: 1 } as buttonType,
  { value: 2 } as buttonType,
  { value: 3 } as buttonType,
  { value: 4 } as buttonType,
  { value: 5 } as buttonType,
  { value: 6 } as buttonType,
  { value: 7 } as buttonType,
  { value: 8 } as buttonType,
  { value: 9 } as buttonType,
  { value: 10, display: "+" } as buttonType,
  { value: 100, display: "MT", color: "#3366CC" } as buttonType,
  { value: 100, display: "出血", color: "#FF3366" } as buttonType,
  { value: 100, display: "排膿", color: "#FFCC00" } as buttonType,
  // { value: 100, display: "印刷", color: "#3399FF" } as buttonType,
];
export default function CommonBottomButton() {
  const [selectedPrinter, setSelectedPrinter] = React.useState<Print.Printer>();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      {BUTTON_NAMES.map((button) => (
        <ButtonAtom
          style={
            button.color !== undefined
              ? { backgroundColor: button.color }
              : undefined
          }
          onPress={print}
        >
          {button.display ?? button.value}
        </ButtonAtom>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
