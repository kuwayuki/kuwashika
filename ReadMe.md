npm run start

React Native パッケージャー(▷ 　 ⇒ 　 □)
19000

Attach to pacakagr（F5）
19000

Remote JS
※省略可能(起動しっぱなしならそれでもいい)

ブラウザのデバッグモードは切らないとだめ
スマホからリロードすると、ブラウザのデバッグモードが起動するので、切ってから F5 デバッグする

Admob
https://docs.expo.dev/versions/v44.0.0/sdk/admob/

Google Admob
https://apps.admob.com/v2/home?_ga=2.71246102.782286764.1642601502-166732312.1642306416

AuthSession
https://docs.expo.dev/versions/v44.0.0/sdk/auth-session/

StoreReview
https://docs.expo.dev/versions/v44.0.0/sdk/storereview/

次に、アプリ内に広告ユニットを配置します
導入の手順は次のとおりです。
このアプリ ID を使用して、Google Mobile Ads SDK ガイドの手順を完了してください。
歯周病検査 ca-app-pub-2103807205659646~3739470895
リワード導入ガイドに沿って SDK を組み込んでください。広告の種類とプレースメントは、この広告ユニット ID を使用してコードを設定する際に指定します。
リワード ca-app-pub-2103807205659646/7101815610

app.json
// "orientation": "portrait", 縦向き

Error Domain=com.google.admob Code=0 "Cannot determine request type. Is your ad unit id correct?" UserInfo={NSLocalizedDescription=Cannot determine request type. Is your ad unit id correct?, gad_response_info= ** Response Info **
Response ID: (null)
Network: (null)

** Mediation line items **
}
at Object.promiseMethodWrapper [as callMethod] (c:\workspace\kuwashika.git\node_modules\react-native\Libraries\BatchedBridge\NativeModules.js:106:51)
at Object.NativeModulesProxy.<computed>.<computed> [as requestAd] (c:\workspace\kuwashika.git\node_modules\expo-modules-core\build\NativeModulesProxy.native.js:15:36)  
at \_callee3$ (c:\workspace\kuwashika.git\node_modules\expo-ads-admob\build\AdMobInterstitial.js:39:33)
at tryCatch (c:\workspace\kuwashika.git\node_modules\regenerator-runtime\runtime.js:63:40)
at Generator.invoke [as _invoke] (c:\workspace\kuwashika.git\node_modules\regenerator-runtime\runtime.js:294:22)
at Generator.next (c:\workspace\kuwashika.git\node_modules\regenerator-runtime\runtime.js:119:21)
at tryCatch (c:\workspace\kuwashika.git\node_modules\regenerator-runtime\runtime.js:63:40)
at invoke (c:\workspace\kuwashika.git\node_modules\regenerator-runtime\runtime.js:155:20)
at c:\workspace\kuwashika.git\node_modules\regenerator-runtime\runtime.js:190:11
at tryCallTwo (c:\workspace\kuwashika.git\.vscode\.react\node_modules%5Cexpo%5CAppEntry.bundle:29526:7) {code: 'E_AD_REQUEST_FAILED', message: 'Error Domain=com.google.admob Code=0 "Cannot…work: (null)

** Mediation line items **
}', nativeStackIOS: Array(17), domain: 'com.google.admob', userInfo: {…}, …}
arg0:Error: Error Domain=com.google.admob Code=0 "Cannot determine request type. Is your ad unit id correct?" UserInfo={NSLocalizedDescription=Cannot determine request type. Is your ad unit id correct?, gad_response_info= ** Response Info **
Response ID: (null)
Network: (null)

** Mediation line items **
}
at Object.promiseMethodWrapper [as callMethod] (c:\workspace\kuwashika.git\.vscode\.react\node_modules%5Cexpo%5CAppEntry.bundle:22573:36)
at Object.NativeModulesProxy.<computed>.<computed> [as requestAd] (c:\workspace\kuwashika.git\.vscode\.react\node_modules%5Cexpo%5CAppEntry.bundle:109869:30)
at \_callee3$ (c:\workspace\kuwashika.git\.vscode\.react\node_modules%5Cexpo%5CAppEntry.bundle:177601:92)
at tryCatch (c:\workspace\kuwashika.git\.vscode\.react\node_modules%5Cexpo%5CAppEntry.bundle:24674:19)
at Generator.invoke [as _invoke] (c:\workspace\kuwashika.git\.vscode\.react\node_modules%5Cexpo%5CAppEntry.bundle:24844:24)
at Generator.next (c:\workspace\kuwashika.git\.vscode\.rea...
reactConsoleErrorHandler @ c:\workspace\kuwashika.git\node_modules\react-native\Libraries\Core\ExceptionsManager.js:184:3

Expo で作成したアプリを App Store に申請するまで
https://qiita.com/mildsummer/items/e98b1b8e4ea7f72b9899

_アプリのビルド Credential の作成_
※expo build:ios で自動的に作成される
Certificates, Identifiers & Profiles
https://developer.apple.com/account/resources/identifiers/list

_アプリの公開_
App Store Connect
https://appstoreconnect.apple.com/apps

SKU に命名規則はありません。ただし、App001 のように適当な名前をつけると紛らわしいので、おすすめしません。私の場合、Bundle ID が com.example.MyApp なら SKU は ComExampleMyApp のように設定しています。

月額課金：
https://docs-expo-dev.translate.goog/versions/latest/sdk/in-app-purchases/?_x_tr_sl=en&_x_tr_tl=ja&_x_tr_hl=ja&_x_tr_pto=sc
参考:https://tech-blog.re-arc-lab.jp/posts/211015_expo-in-app-purchases/

アプリ説明
プロモーション用テキスト（170 文字）：
概要（4000 文字）：

キーワード（100 文字）：
歯周病 歯周病検査 PPD ppd pcr 動揺度 ししゅうびょう

サポート URL：
マーケティング URL：

6.5 インチ (iPhone 13 Pro Max、iPhone 12 Pro Max)
5.5 インチ (iPhone 8 Plus)
12.9 インチ (iPad Pro (第 4 世代、第 3 世代))
12.9 インチ (iPad Pro (第 2 世代))

expo build:ios

Thanks for a lot checking.
I ansered following.

- Does your app include the login mechanism?
  No, it is not login mechanism.

- What is the 月額課金 for, and what are the costs?
  Sorry, it is not finished publish yet.
  I deleted this function, so please chack again.

OTA update のやりかた

$ expo publish

import { AdMobRewarded } from 'expo-ads-admob';

class HomeScreen extends React.Component {

Reward = async () => {
if (**DEV**) {
AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
} else {
if (Platform.OS === 'ios') {
AdMobRewarded.setAdUnitID('広告ユニット ID'); // iOS
} else {
AdMobRewarded.setAdUnitID('広告ユニット ID'); // android
}
}
await AdMobRewarded.requestAdAsync();
await AdMobRewarded.showAdAsync();
};

buttonPress = () => {
this.Reward()
}

componentDidMount = () => {
AdMobRewarded.addEventListener('rewarded', () => {
// 広告最後までみた人が実行できる処理
});
};
componentWillUnmount() {
AdMobRewarded.removeAllListeners();
}
