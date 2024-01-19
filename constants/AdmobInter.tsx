import { useEffect, useState } from "react";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import { BANNER_UNIT_ID } from "./Constant";
import { getRandomId } from "./Util";

function selectAdId() {
  const random = getRandomId(3);
  // ここで適切な広告IDの選択ロジックを実装します
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

let interstitial;

const initializeAd = () => {
  const id = selectAdId();
  interstitial = InterstitialAd.createForAdRequest(id, {
    keywords: ["dental"],
  });
};

export type AdmobInterType = {
  isShow: boolean;
  setShow: (isShow: boolean) => void;
};

export function AdmobInter(props: AdmobInterType) {
  const [loaded, setLoaded] = useState(false);

  const loadAd = () => {
    initializeAd();
    interstitial.load();
  };

  useEffect(() => {
    loadAd();
  }, []);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        loadAd(); // 広告を再ロード
      }
    );

    const unsubscribeError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error("Ad Load Error: ", error);
        setLoaded(false);
      }
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  useEffect(() => {
    if (props.isShow && loaded) {
      if (interstitial?.loaded) {
        interstitial.show();
      }
      props.setShow(false);
    }
  }, [props.isShow, loaded]);

  return null;
}
