import {
  AdEventType,
  RewardedAdEventType,
  RewardedInterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { BANNER_UNIT_ID } from "./Constant";
import { sleep } from "./Util";

export const getRandomId = (maxCount: number) => {
  const randomIndex = Math.floor(Math.random() * maxCount);
  return randomIndex;
};

function selectAdId() {
  const random = getRandomId(0);
  // const random = getRandomId(3);
  switch (random) {
    case 0:
      return BANNER_UNIT_ID.REWARD_INTERSTIAL_1;
    // return TestIds.REWARDED_INTERSTITIAL;
    case 1:
      return BANNER_UNIT_ID.REWARD_INTERSTIAL_1;
    case 2:
      return BANNER_UNIT_ID.REWARD_INTERSTIAL_1;
  }
  // return TestIds.INTERSTITIAL;
  return BANNER_UNIT_ID.REWARD_INTERSTIAL_1;
}

let interstitial: RewardedInterstitialAd | null = null;
let isAdmobing: boolean = false;

export function rewardInitializeInterstitialAd(isLoadedShow?: boolean) {
  // alert("initializeInterstitialAd");
  const id = selectAdId();
  interstitial = RewardedInterstitialAd.createForAdRequest(id);

  interstitial.load();
  // alert("load");

  // イベントリスナーの追加
  interstitial.addAdEventListener(RewardedAdEventType.LOADED, () => {
    console.log("Ad Loaded");
    if (isLoadedShow) {
      interstitial!.show();
    }
    // alert("Ad Loaded");
  });

  interstitial.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
    console.log("Ad Rewarded");
    isAdmobing = true;
  });

  interstitial.addAdEventListener(AdEventType.CLOSED, (error) => {
    console.error("Ad Load Closed: ", error);
    interstitial?.load();
  });

  interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
    console.error("Ad Load Error: ", error);
    interstitial?.load();
  });
}

/**
 * ロード済で即時抗告表示したい場合
 * @param setAdClosed
 */
export async function showRewardInterstitialAd() {
  if (interstitial?.loaded) {
    interstitial!.show();
  } else {
    // 再読み込み&広告表示
    rewardInitializeInterstitialAd(true);
  }
}

function rewardedSet(isRewarded: boolean, setAdClosed: (is: boolean) => void) {
  setAdClosed(isRewarded);
  isRewarded = isRewarded;
}
// export async function showRewardInterstitialAd() {
//   // 読み込めてなかったら再ロード
//   if (!interstitial?.loaded) {
//     interstitial?.load();
//   }

//   if (interstitial?.loaded) {
//     isAdmobing = false;
//     interstitial.show();
//     const timeout = 60 * 1000; // 60 seconds
//     const start = Date.now();

//     while (true) {
//       await sleep(1000);
//       if (isAdmobing || Date.now() - start > timeout) break;
//     }
//   } else {
//     interstitial?.load();
//   }
// }
