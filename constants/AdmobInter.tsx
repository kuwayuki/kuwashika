import { useEffect, useState } from "react";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import { BANNER_UNIT_ID } from "./Constant";
import { getRandomId } from "./Util";

function ADMOB_ID() {
  const random = getRandomId(3);
  switch (random) {
    case 0:
      return BANNER_UNIT_ID.INTERSTIAL;
    case 1:
      return BANNER_UNIT_ID.INTERSTIAL_2;
    case 2:
      return BANNER_UNIT_ID.INTERSTIAL_3;
  }
  return BANNER_UNIT_ID.INTERSTIAL_3;
}
const id = ADMOB_ID();
let interstitial = InterstitialAd.createForAdRequest(id, {
  keywords: ["Dental Education"],
});

export type AdmobInterType = {
  isShow: boolean;
  setShow: (isShow: boolean) => void;
};

export function AdmobInter(props: AdmobInterType) {
  const [loaded, setLoaded] = useState(false);

  const loadAd = () => {
    const id = ADMOB_ID();
    interstitial = InterstitialAd.createForAdRequest(id, {
      keywords: ["Dental Conferences"],
    });
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
    if (props.isShow && interstitial?.loaded) {
      interstitial.show();
      props.setShow(false);
      setLoaded(false);
    }
  }, [interstitial?.loaded, props.isShow]);
  return null;
}
