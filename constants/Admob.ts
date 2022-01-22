import { AdMobRewarded } from "expo-ads-admob";

export const admobReward = async () => {
  try {
    AdMobRewarded.setAdUnitID("ca-app-pub-2103807205659646/7101815610"); // Test ID, Replace with your-admob-unit-id
    // AdMobRewarded.setTestDeviceID('EMULATOR')
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  } catch (error) {
    console.log(error);
  }
};
