import { FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as React from "react";
import { Button, ColorSchemeName, Pressable } from "react-native";
import ModalScreen from "../components/pages/ModalScreen";
import NotFoundScreen from "../components/pages/NotFoundScreen";
import PcrPage from "../components/pages/PcrPage";
import PpdPage from "../components/pages/PpdPage";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
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

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      <Button title="Print" onPress={print} />
      {/* <Button title="Print to PDF file" onPress={printToFile} />
      <Button title="Select printer" onPress={selectPrinter} /> */}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="歯周病検査"
        component={BottomTabNavigator}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// const BottomTab = createBottomTabNavigator<RootTabParamList>();
const TopTab = createMaterialTopTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      initialRouteName="TabPeriodontal"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <TopTab.Screen
        name="TabPeriodontal"
        component={PpdPage}
        options={({ navigation }: RootTabScreenProps<"TabPeriodontal">) => ({
          title: "PPD",
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <TopTab.Screen
        name="TabUpset"
        component={PcrPage}
        options={{
          title: "動揺度",
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <TopTab.Screen
        name="TabPCR"
        component={PcrPage}
        options={{
          title: "PCR",
          // tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </TopTab.Navigator>
  );
}

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
