import { useEffect, useState } from "react";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import { BANNER_UNIT_IAD } from "./Constant";

const interstitial = InterstitialAd.createForAdRequest(
  BANNER_UNIT_IAD.INTERSTIAL,
  {
    keywords: ["medical"],
  }
);

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
