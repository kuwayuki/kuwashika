import { AppOpenAd } from "react-native-google-mobile-ads";
import { BANNER_UNIT_ID } from "./Constant";

export const AdmobAppOpenAd = async () => {
  const appOpenAd = AppOpenAd.createForAdRequest(BANNER_UNIT_ID.APP_OPEN_1, {
    keywords: ["fashion", "clothing"],
  });

  appOpenAd.load();

  appOpenAd.show();
};
