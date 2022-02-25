import { AdMobRewarded } from "expo-ads-admob";

export const admobReward = async (isReload?: boolean) => {
  try {
    if (isReload) await createReward();
    if (await AdMobRewarded.getIsReadyAsync()) {
      await AdMobRewarded.showAdAsync();
    }
  } catch (error) {
    console.log(error);
  }
};

/** リワード */
export const createReward = async () => {
  await createAdmob("ca-app-pub-2103807205659646/7101815610");
};

/** インタースティシャル */
export const createInterstitial = async () => {
  await createAdmob("ca-app-pub-2103807205659646/7101815610");
};

export const createAdmob = async (unitId: string) => {
  try {
    await AdMobRewarded.setAdUnitID(unitId);
    await AdMobRewarded.requestAdAsync();
  } catch (error) {
    console.log(error);
  }
};
