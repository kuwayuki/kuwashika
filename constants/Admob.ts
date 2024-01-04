import { useEffect, useState } from "react";
import { AdEventType, RewardedAd } from "react-native-google-mobile-ads";

const adUnitId = "ca-app-pub-2103807205659646/7101815610";

const admob = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

export const admobReward = async () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = admob.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    admob.load();
    return unsubscribe;
  }, []);

  if (!loaded) {
    return null;
  }

  try {
    if (admob.loaded) await admob.show();
  } catch (error) {
    console.error(error);
  }
};
