import { AdMobRewarded } from "expo-ads-admob";

export const admobReward = async (isReload?: boolean) => {
  try {
    if (isReload) await createReward();
    await AdMobRewarded.showAdAsync();
  } catch (error) {
    console.log(error);
  }
};

export const createReward = async () => {
  try {
    AdMobRewarded.setAdUnitID("ca-app-pub-2103807205659646/7101815610");
    await AdMobRewarded.requestAdAsync();
  } catch (error) {
    console.log(error);
  }
};
