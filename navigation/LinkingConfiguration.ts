import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      歯周病検査: {
        screens: {
          TabPeriodontal: {
            screens: {
              TabOneScreen: "歯周病",
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
