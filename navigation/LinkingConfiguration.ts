import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types";
import { i18n } from "../components/locales/i18n";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      PerioDental: {
        screens: {
          TabPeriodontal: {
            screens: {
              TabOneScreen: i18n.t("navigation.tab_one_screen"),
            },
          },
          TabPCR: {
            screens: {
              TabTwoScreen: "PCR",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
