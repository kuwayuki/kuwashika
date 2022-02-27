import { AdMobRewarded } from "expo-ads-admob";
import { isAndroid } from "./Util";

export const admobReward = async (isInterstitial: boolean) => {
  try {
    isInterstitial ? await createInterstitial() : await createReward();
    if (await AdMobRewarded.getIsReadyAsync()) {
      await AdMobRewarded.showAdAsync();
    }
  } catch (error) {
    console.log(error);
  }
};

/** リワード */
export const createReward = async () => {
  await createAdmob(
    isAndroid()
      ? "ca-app-pub-2103807205659646/8775421520"
      : "ca-app-pub-2103807205659646/7101815610"
  );
};

/** インタースティシャル */
export const createInterstitial = async () => {
  await createAdmob(
    isAndroid()
      ? "ca-app-pub-2103807205659646/8495703005"
      : "ca-app-pub-2103807205659646/3067799275"
  );
};

export const createAdmob = async (unitId: string) => {
  try {
    await AdMobRewarded.setAdUnitID(unitId);
    await AdMobRewarded.requestAdAsync();
  } catch (error) {
    console.log(error);
  }
};
