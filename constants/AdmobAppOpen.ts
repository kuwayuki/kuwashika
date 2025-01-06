import { AppOpenAd, AdEventType } from "react-native-google-mobile-ads";
import { BANNER_UNIT_ID } from "./Constant";
import { getRandomId } from "./Util";

function selectAdId() {
  const random = getRandomId(3);
  switch (random) {
    case 0:
      return BANNER_UNIT_ID.APP_OPEN_1;
  }
  return BANNER_UNIT_ID.APP_OPEN_1;
}

let appOpenAd: AppOpenAd | null = null;

export function initializeAppOpenAd(onLoaded: () => void) {
  const id = selectAdId();
  appOpenAd = AppOpenAd.createForAdRequest(id, {
    keywords: ["dental"],
  });

  appOpenAd.load();

  appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
    if (onLoaded) {
      onLoaded();
    }
  });

  appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
    console.log("Ad Closed");
    // Optionally, reload the ad here
  });

  appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
    console.error("Ad Load Error: ", error);
  });
}

export function showAppOpenAd() {
  if (appOpenAd && appOpenAd.loaded) {
    appOpenAd.show();
  } else {
    console.error("Ad is not ready to be shown");
  }
}
