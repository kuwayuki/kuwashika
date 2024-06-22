import * as FileSystem from "expo-file-system";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";
import { AppContextDispatch, AppContextState } from "../../../App";
import { AUTH_FILE } from "../../../constants/Constant";
import {
  PPD_ORDER_DOWN,
  PPD_ORDER_UP,
  checkPremium,
} from "../../../constants/Util";
import AlertAtom from "../../atoms/AlertAtom";
import ButtonAtom from "../../atoms/ButtonAtom";
import IconAtom from "../../atoms/IconAtom";
import ModalAtom from "../../atoms/ModalAtom";
import SwitchAtom from "../../atoms/SwitchAtom";
import TextAtom from "../../atoms/TextAtom";
import IconTitleAction from "../../moleculars/IconTitleAction";
import MainTitleChildren from "../../moleculars/MainTitleChildren";
import CommonSubscription, { subscriptionDetails } from "./CommonSubscription";
import { i18n } from "../../locales/i18n";

export default function CommonSetting() {
  const appContextState = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);
  const locale = i18n.locale;

  const [patientNumber, setPatientNumber] = useState<number>();
  const [patientName, setPatientName] = useState<string>(undefined);
  const [isPpdUpKo, setPpdUpKo] = useState<boolean>(
    appContextState.settingData.setting.ppdOrderType.up === PPD_ORDER_UP.ko
  );
  const [isPpdDownHako, setPpdDownHako] = useState<boolean>(
    appContextState.settingData.setting.ppdOrderType.down ===
      PPD_ORDER_DOWN.hako
  );
  const [isAutoMove, setAutoMove] = useState<boolean>(
    appContextState.settingData.setting.isAutoMove
  );
  const [isPcrAutoMove, setPcrAutoMove] = useState<boolean>(
    appContextState.settingData.setting.isPcrAutoMove
  );
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSubscription, setIsOpenSubscription] = useState(false);

  // 初期データ読込処理
  useEffect(() => {
    setPatientNumber(appContextState.patientNumber);
    const patient = appContextState.settingData.persons.find(
      (patient) => patient.patientNumber === appContextState.patientNumber
    );
    setPatientName(patient?.patientName);
  }, []);

  const savePpd = (isUp: boolean) => {
    const setPpd = isUp ? !isPpdUpKo : !isPpdDownHako;
    isUp ? setPpdUpKo(setPpd) : setPpdDownHako(setPpd);

    // 全体データの更新
    appContextDispatch.setSettingData({
      ...appContextState.settingData,
      setting: {
        ...appContextState.settingData.setting,
        ppdOrderType: isUp
          ? {
              ...appContextState.settingData.setting.ppdOrderType,
              up: setPpd ? PPD_ORDER_UP.ko : PPD_ORDER_UP.z,
            }
          : {
              ...appContextState.settingData.setting.ppdOrderType,
              down: setPpd ? PPD_ORDER_DOWN.hako : PPD_ORDER_DOWN.ko_re,
            },
      },
    });
  };

  const saveAutoMove = (isAutoMove) => {
    setAutoMove(isAutoMove);
    // 全体データの更新
    appContextDispatch.setSettingData({
      ...appContextState.settingData,
      setting: {
        ...appContextState.settingData.setting,
        isAutoMove: isAutoMove,
      },
    });
  };

  const savePcrAutoMove = (isPcrAutoMove) => {
    setPcrAutoMove(isPcrAutoMove);
    // 全体データの更新
    appContextDispatch.setSettingData({
      ...appContextState.settingData,
      setting: {
        ...appContextState.settingData.setting,
        isPcrAutoMove: isPcrAutoMove,
      },
    });
  };

  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setPatientNumber(
      appContextState.currentPerson.patientNumber
    );
  };

  useEffect(() => {
    const f = async () => {
      Purchases.configure({
        apiKey: "appl_NkrQYcmcIAPLFiwlYVyYtEBegvJ",
      });
      const customerInfo = await Purchases.getCustomerInfo();
      if (checkPremium(customerInfo)) {
        appContextDispatch.setPremium(true);
        return;
      }

      const offerings = await Purchases.getOfferings();
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        setCurrentOffering(offerings.current);
      }
    };
    f();
  }, []);

  const payment = async () => {
    // TODO: 後で治す
    if (false) {
      appContextDispatch.setPremium(true);
      setIsOpenSubscription(false);
      return true;
    }
    if (!currentOffering || isLoading) return;
    const localpurchasesPackage = currentOffering.availablePackages[0];
    if (!localpurchasesPackage) return;

    console.log(localpurchasesPackage);
    setIsLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(
        localpurchasesPackage
      );
      if (checkPremium(customerInfo)) {
        appContextDispatch.setPremium(true);
        Alert.alert(i18n.t("alerts.premium_subscribed"));
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.log(e);
      }
      Alert.alert(i18n.t("alerts.subscription_failed"));
    } finally {
      setIsLoading(false);
      setIsOpenSubscription(false);
    }
  };

  const restorePurchases = async () => {
    try {
      setIsLoading(true);
      const customerInfo = await Purchases.restorePurchases();
      if (checkPremium(customerInfo)) {
        appContextDispatch.setPremium(true);
        Alert.alert(i18n.t("alerts.restore_purchase_success"));
      } else {
        Alert.alert(i18n.t("alerts.no_purchase_to_restore"));
      }
    } catch (e) {
      Alert.alert(i18n.t("alerts.restore_purchase_failure"));
    } finally {
      setIsLoading(false);
    }
  };

  // データの初期化
  const initData = async () => {
    AlertAtom(
      i18n.t("actions.initialize"),
      i18n.t("alerts.delete_confirmation"),
      async () => {
        // 全体データの更新
        appContextDispatch.setModalNumber(0);
        appContextDispatch.deletePerson();
        Alert.alert(i18n.t("alerts.initialized"));
      }
    );
  };

  // ユーザーの削除
  const deletePatientData = async () => {
    AlertAtom(
      i18n.t("settings.delete_user"),
      `[${patientNumber + ":" + (patientName ?? "")}]${i18n.t(
        "alerts.delete_confirm"
      )}`,
      async () => {
        // 全体データの更新
        appContextDispatch.setModalNumber(0);
        appContextDispatch.deletePerson(appContextState.patientNumber);
        Alert.alert(i18n.t("alerts.deleted"));
      }
    );
  };

  // 検査データの削除
  const deleteInspectionData = async () => {
    AlertAtom(
      i18n.t("settings.delete_inspection_data"),
      i18n.t("alerts.delete_inspection_data_confirmation"),
      async () => {
        appContextDispatch.setModalNumber(0);
        appContextDispatch.deletePerson(
          undefined,
          appContextState.inspectionDataNumber
        );
        Alert.alert(i18n.t("alerts.deleted"));
      }
    );
  };

  const deleteFileData = async () => {
    const fileUri = FileSystem.documentDirectory + AUTH_FILE;
    await FileSystem.deleteAsync(fileUri);
  };

  if (isOpenSubscription) {
    return (
      <CommonSubscription
        onPress={payment}
        onPressRestore={restorePurchases}
        onClose={() => setIsOpenSubscription(false)}
      ></CommonSubscription>
    );
  }

  return (
    <ModalAtom isSetting={true}>
      <View
        style={{
          position: "absolute",
          paddingTop: 16,
          paddingLeft: 16,
        }}
      >
        <IconAtom
          name="arrow-back"
          type="material-icon"
          size={30}
          raised={false}
          onPress={cancel}
        />
      </View>
      <ScrollView
        style={{
          height: "100%",
          padding: 10,
          backgroundColor: "#EFFFF0",
        }}
      >
        <MainTitleChildren
          title={i18n.t("settings.data_management")}
          style={{ marginBottom: 16 }}
        >
          {(locale === "ja" || appContextState.isPremium) && (
            <IconTitleAction
              title={i18n.t("settings.premium_plan")}
              icon={<IconAtom name="payment" type="material-icon" />}
            >
              {appContextState.isPremium ? (
                <TextAtom
                  style={{
                    color: "blue",
                    paddingRight: 4,
                    textAlignVertical: "center",
                    fontSize: 18,
                  }}
                >
                  {i18n.t("settings.subscribed")}
                </TextAtom>
              ) : (
                <ButtonAtom
                  onPress={() => setIsOpenSubscription(true)}
                  style={{ backgroundColor: "pink", padding: 12 }}
                >
                  {i18n.t("settings.check_plan")}
                </ButtonAtom>
              )}
            </IconTitleAction>
          )}
          {appContextState.isPremium && (
            <IconTitleAction
              title={i18n.t("settings.user")}
              icon={<IconAtom name="user" type="ant-design" />}
            >
              <ButtonAtom
                onPress={() => {
                  !appContextState.user
                    ? appContextDispatch.setModalNumber(101)
                    : signOut(getAuth()).then(async () => {
                        await deleteFileData();
                        appContextDispatch.setUser(null);
                      });
                }}
                style={{
                  backgroundColor: !appContextState.user
                    ? "skyblue"
                    : "lightgray",
                  padding: 12,
                }}
              >
                {!appContextState.user
                  ? i18n.t("settings.sign_in")
                  : i18n.t("settings.sign_out")}
              </ButtonAtom>
            </IconTitleAction>
          )}
        </MainTitleChildren>
        <MainTitleChildren
          title={i18n.t("settings.common_settings")}
          style={{ marginBottom: 16 }}
        >
          <IconTitleAction
            title={i18n.t("settings.auto_tab_move")}
            icon={<IconAtom name={"autorenew"} type="material-icons" />}
          >
            <SwitchAtom
              onValueChange={() => saveAutoMove(!isAutoMove)}
              value={isAutoMove}
            />
          </IconTitleAction>
        </MainTitleChildren>
        <MainTitleChildren
          title={i18n.t("settings.ppd_detailed_settings")}
          style={{ marginBottom: 16 }}
        >
          <IconTitleAction
            title={
              i18n.t("settings.upper_teeth_order") +
              (isPpdUpKo
                ? `コ(${i18n.t("settings.upper_teeth_right")})`
                : `Ｚ(${i18n.t("settings.upper_teeth_right")})`)
            }
            icon={
              isPpdUpKo ? (
                <IconAtom name={"swap-horiz"} type="material-icons" />
              ) : (
                <IconAtom
                  name={"ios-trending-up"}
                  type="ionicon"
                  style={{
                    transform: [{ rotate: "30deg" }],
                  }}
                />
              )
            }
          >
            <SwitchAtom onValueChange={() => savePpd(true)} value={isPpdUpKo} />
          </IconTitleAction>
          <IconTitleAction
            title={
              i18n.t("settings.lower_teeth_order") +
              (isPpdDownHako
                ? `匚(${i18n.t("settings.lower_teeth_left")})`
                : `コ(${i18n.t("settings.lower_teeth_right")})`)
            }
            icon={
              isPpdDownHako ? (
                <IconAtom name={"swap-horiz"} type="material-icons" />
              ) : (
                <IconAtom name={"swap"} type="entypo" />
              )
            }
          >
            <SwitchAtom
              onValueChange={() => savePpd(false)}
              value={isPpdDownHako}
            />
          </IconTitleAction>
        </MainTitleChildren>
        <MainTitleChildren
          title={i18n.t("settings.pcr_detailed_settings")}
          style={{ marginBottom: 16 }}
        >
          <IconTitleAction
            title={i18n.t("settings.auto_focus")}
            icon={
              <IconAtom
                name={"image-filter-center-focus"}
                type="material-community"
              />
            }
          >
            <SwitchAtom
              onValueChange={() => savePcrAutoMove(!isPcrAutoMove)}
              value={isPcrAutoMove}
            />
          </IconTitleAction>
        </MainTitleChildren>
        <MainTitleChildren
          title={i18n.t("settings.data_deletion")}
          style={{ marginBottom: 32 }}
        >
          <IconTitleAction
            title={i18n.t("settings.user")}
            icon={<IconAtom name="deleteuser" type="ant-design" />}
          >
            <ButtonAtom
              onPress={deletePatientData}
              style={{ backgroundColor: "red", padding: 12 }}
            >
              {i18n.t("common.delete")}
            </ButtonAtom>
          </IconTitleAction>
          <IconTitleAction
            title={i18n.t("inspection.inspection_data")}
            icon={<IconAtom name="delete" type="ant-design" />}
          >
            <ButtonAtom
              onPress={deleteInspectionData}
              style={{ backgroundColor: "red", padding: 12 }}
            >
              {i18n.t("common.delete")}
            </ButtonAtom>
          </IconTitleAction>
          <IconTitleAction
            title={i18n.t("settings.initialize_all_data")}
            icon={<IconAtom name="delete-forever" type="material-icon" />}
          >
            <ButtonAtom
              onPress={initData}
              style={{ backgroundColor: "red", padding: 12 }}
            >
              {i18n.t("common.delete")}
            </ButtonAtom>
          </IconTitleAction>
        </MainTitleChildren>
      </ScrollView>
    </ModalAtom>
  );
}

const styles = StyleSheet.create({});
