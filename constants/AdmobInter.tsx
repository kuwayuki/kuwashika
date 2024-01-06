import { useEffect, useState } from "react";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import { BANNER_UNIT_IAD } from "./Constant";

let interstitial = InterstitialAd.createForAdRequest(
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

  const loadAd = () => {
    interstitial = InterstitialAd.createForAdRequest(
      BANNER_UNIT_IAD.INTERSTIAL,
      {
        keywords: ["medical"],
      }
    );
    interstitial.load();
  };

  const unsubscribeLoaded = interstitial.addAdEventListener(
    AdEventType.LOADED,
    () => {
      setLoaded(true);
    }
  );

  const unsubscribeClosed = interstitial.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      // loadAd(); // 広告を再ロード
    }
  );
  const unsubscribeError = interstitial.addAdEventListener(
    AdEventType.ERROR,
    (event) => {
      console.log(event);
      console.log("error");
      setLoaded(false);
    }
  );

  useEffect(() => {
    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  useEffect(() => {
    if (loaded) return;
    loadAd(); // 再ロード
    console.log("再ロード");
  }, [loaded]);

  useEffect(() => {
    if (props.isShow && loaded) {
      if (interstitial?.loaded) interstitial.show();
      props.setShow(false);
      setLoaded(false);
    }
  }, [loaded, props.isShow]);
  return null;
}
