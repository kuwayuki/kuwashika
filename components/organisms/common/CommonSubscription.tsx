import { Text, TouchableOpacity, View } from "react-native";
import ButtonAtom from "../../atoms/ButtonAtom";
import { openURL } from "expo-linking";
import { i18n } from "../../locales/i18n";

type CommonSubscriptionType = {
  onPress: () => void;
  onPressRestore: () => void;
  onClose: () => void;
};

export const subscriptionDetails = {
  title: i18n.t("subscription.title"),
  price: i18n.t("subscription.price"),
  benefits: i18n.t("subscription.benefits"),
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
          {`${i18n.t("subscription.subscribe_button")}[${
            subscriptionDetails.price
          }]`}
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
            {i18n.t("common.cancel")}
          </ButtonAtom>
          <ButtonAtom
            onPress={props.onPressRestore}
            style={{
              backgroundColor: "lightgray",
              width: 150,
            }}
          >
            {i18n.t("subscription.restore_button")}
          </ButtonAtom>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "white" }}>
            {i18n.t("subscription.premium_join")}
          </Text>
          <TouchableOpacity
            onPress={() => openURL(subscriptionDetails.termsUrl)}
          >
            <Text style={{ color: "pink" }}>
              {i18n.t("subscription.terms_and_conditions")}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "white" }}>・</Text>
          <TouchableOpacity
            onPress={() => openURL(subscriptionDetails.privacyPolicyUrl)}
          >
            <Text style={{ color: "pink" }}>
              {i18n.t("subscription.privacy_policy")}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "white" }}>
            {i18n.t("subscription.accept")}
          </Text>
        </View>
        <Text style={{ color: "white" }}>
          {i18n.t("subscription.auto_renewal_text")}
        </Text>
      </View>
    </View>
  );
}
