import { useEffect, useState } from "react";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

const adUnitId = "ca-app-pub-2103807205659646/3067799275";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

export type AdmobInterType = {
  isShow: boolean;
  setShow: (isShow: boolean) => void;
};

export function AdmobInter(props: AdmobInterType) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log("読み込んだ？");
        setLoaded(true);
      }
    );
    const error = interstitial.addAdEventListener(AdEventType.ERROR, () => {
      console.log("error");
    });

    // Start loading the interstitial straight away
    interstitial.load();

    error;
    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (props.isShow && interstitial?.loaded) {
      interstitial.show();
      props.setShow(false);
    }
  }, [interstitial?.loaded, props.isShow]);
  return null;
}
