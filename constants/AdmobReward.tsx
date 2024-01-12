import React, { useEffect, useState } from "react";
import mobileAds, {
  BannerAd,
  BannerAdSize,
  RewardedAd,
  TestIds,
} from "react-native-google-mobile-ads";

// 初期化
mobileAds()
  .initialize()
  .then((adapterStatuses) => {});

// ユニットID
const adBannerUnitId = "ca-app-pub-2103807205659646~3739470895";
const adRewardedUnitId = "ca-app-pub-2103807205659646~3739470895";

// リワード広告のキーワードを設定
const rewarded = RewardedAd.createForAdRequest(adRewardedUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["game"],
});

export function admobRewardBanner() {
  return (
    <BannerAd
      unitId={adBannerUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
