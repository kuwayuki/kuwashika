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
