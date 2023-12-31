import { useEffect, useState } from "react";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-2103807205659646~3739470895";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

export const admobReward = async () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    interstitial.load();
    return unsubscribe;
  }, []);

  if (!loaded) {
    return null;
  }

  try {
    if (interstitial.loaded) await interstitial.show();
  } catch (error) {
    console.log(error);
  }
};
