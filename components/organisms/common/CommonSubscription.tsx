import { Text, TouchableOpacity, View } from "react-native";
import ButtonAtom from "../../atoms/ButtonAtom";
import { openURL } from "expo-linking";

type CommonSubscriptionType = {
  onPress: () => void;
  onPressRestore: () => void;
  onClose: () => void;
};

export const subscriptionDetails = {
  title: "ペリオチャートプレミアムプラン",
  price: "¥500/月",
  benefits:
    "プレミアムプランの加入で、アプリを広告なしで利用できます。\r\nまた、サインイン(β版)で別アプリとのデータ共有を行うことができます。\r\n(共通のApple IDで利用する必要があります。)",
  termsUrl: "https://kuwank.hatenablog.com/entry/2024/01/07/230214", // 利用規約のURL
  privacyPolicyUrl: "https://kuwank.hatenablog.com/entry/2024/01/07/230533", // プライバシーポリシーのURL
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
          alignItems: "center",
          width: 600,
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
          style={{ marginBottom: 10, backgroundColor: "aqua", width: 400 }}
        >
          プレミアムプランに登録{`[${subscriptionDetails.price}]`}
        </ButtonAtom>
        <View
          style={{
            marginBottom: 30,
            flexDirection: "row",
          }}
        >
          <ButtonAtom
            onPress={props.onClose}
            style={{
              backgroundColor: "white",
              width: 150,
              marginRight: 30,
            }}
          >
            キャンセル
          </ButtonAtom>
          <ButtonAtom
            onPress={props.onPressRestore}
            style={{
              backgroundColor: "lightgray",
              width: 150,
            }}
          >
            購入の復元
          </ButtonAtom>
        </View>
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
          本サブスクリプションは自動的に更新されます。
          更新は、契約期間の終了24時間前までにApp
          Storeのアカウント設定からいつでもキャンセル可能です。
        </Text>
      </View>
    </View>
  );
}
