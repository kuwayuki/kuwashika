import { FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { ColorSchemeName, Pressable } from "react-native";
import ModalScreen from "../components/pages/ModalScreen";
import NotFoundScreen from "../components/pages/NotFoundScreen";
import PcrPage from "../components/pages/PcrPage";
import PpdPage from "../components/pages/PpdPage";
import UpsetPage from "../components/pages/UpsetPage";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { isIpad } from "../constants/Util";
import { i18n } from "../components/locales/i18n";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      {/* <CommonBottomButton /> */}
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
        name="PerioDental"
        component={TopTabNavigator}
        options={{
          headerShown: false,
        }}
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

function TopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      initialRouteName="TabPeriodontal"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // tabBarInactiveTintColor: Colors[colorScheme].background,
      }}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: Colors[colorScheme].background,
        marginTop: isIpad() ? 10 : 0,
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
        component={UpsetPage}
        options={{
          title: i18n.t("navigation.upset"),
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
