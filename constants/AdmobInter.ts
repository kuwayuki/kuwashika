import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import { BANNER_UNIT_ID } from "./Constant";
import { getRandomId } from "./Util";

function selectAdId() {
  const random = getRandomId(3);
  switch (random) {
    case 0:
      return BANNER_UNIT_ID.INTERSTIAL;
    case 1:
      return BANNER_UNIT_ID.INTERSTIAL_2;
    case 2:
      return BANNER_UNIT_ID.INTERSTIAL_3;
  }
  return BANNER_UNIT_ID.INTERSTIAL_3;
}

let interstitial: InterstitialAd | null = null;

export function initializeInterstitialAd() {
  const id = selectAdId();
  interstitial = InterstitialAd.createForAdRequest(id, {
    keywords: ["dental"],
  });

  interstitial.load();

  // イベントリスナーの追加
  interstitial.addAdEventListener(AdEventType.LOADED, () => {
    console.log("Ad Loaded");
  });

  interstitial.addAdEventListener(AdEventType.CLOSED, () => {
    console.log("Ad Closed");
    // 広告を再ロードする
    interstitial?.load();
  });

  interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
    console.error("Ad Load Error: ", error);
  });
}

export function showInterstitialAd() {
  if (interstitial?.loaded) {
    interstitial.show();
  } else {
    console.error("Ad is not ready to be shown");
  }
}
