import { Text, TouchableOpacity, View } from "react-native";
import ButtonAtom from "../../atoms/ButtonAtom";
import { openURL } from "expo-linking";

type CommonSubscriptionType = {
  onPress: () => void;
  onClose: () => void;
};

export const subscriptionDetails = {
  title: "ペリオチャートプレミアムプラン",
  price: "¥500/月",
  benefits:
    "アプリを広告なしで利用できます。\r\nまた、サインインで別アプリとのデータ共有を行うことができます。\r\n(共通のApple IDで利用する必要があります。)",
  termsUrl:
    "https://kuwank.hatenablog.com/entry/2024/01/07/230214?_gl=1*1vkukbq*_gcl_au*MTkxNjUyNDQ0LjE3MDM5NDI4OTk.", // 利用規約のURL
  privacyPolicyUrl:
    "https://kuwank.hatenablog.com/entry/2024/01/07/230533?_gl=1*1rru2iy*_gcl_au*MTkxNjUyNDQ0LjE3MDM5NDI4OTk.", // プライバシーポリシーのURL
};

export default function CommonSubscription(props: CommonSubscriptionType) {
  return (
    <View
      style={{
        height: "100%",
        paddingTop: 12,
        paddingLeft: 16,
        backgroundColor: "#000333",
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 10,
        }}
      >
        <Text style={{ marginBottom: 20, fontSize: 24, color: "white" }}>
          {`${subscriptionDetails.title}`}
        </Text>
        <Text style={{ marginBottom: 20, color: "white" }}>
          {`${subscriptionDetails.price}\n${subscriptionDetails.benefits}`}
        </Text>
        <ButtonAtom
          onPress={props.onPress}
          style={{ marginBottom: 10, backgroundColor: "aqua" }}
        >
          プレミアムプランに登録{`[${subscriptionDetails.price}]`}
        </ButtonAtom>
        <ButtonAtom
          onPress={props.onClose}
          style={{ marginBottom: 10, backgroundColor: "white" }}
        >
          キャンセル
        </ButtonAtom>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "white" }}>プレミアムプランの加入で、</Text>
          <TouchableOpacity
            onPress={() => openURL(subscriptionDetails.termsUrl)}
          >
            <Text style={{ color: "pink" }}>利用規約</Text>
          </TouchableOpacity>
          <Text style={{ color: "white" }}>・</Text>
          <TouchableOpacity
            onPress={() => openURL(subscriptionDetails.privacyPolicyUrl)}
          >
            <Text style={{ color: "pink" }}>プライバシーポリシー</Text>
          </TouchableOpacity>
          <Text style={{ color: "white" }}>に同意いただいたとみなします。</Text>
        </View>
        <Text style={{ color: "white" }}>
          契約期間は、期限が切れる24時間以内に自動更新の解除をされない場合、自動更新されます。
        </Text>
        <Text style={{ color: "white" }}>
          解約方法はApp
          Storeのアカウントの設定から、いつでも解約することができます。
        </Text>
      </View>
    </View>
  );
}
