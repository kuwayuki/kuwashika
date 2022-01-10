import * as React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import { PPD_ORDER_DOWN, PPD_ORDER_UP } from "../../../constants/Util";
import AlertAtom from "../../atoms/AlertAtom";
import ButtonAtom from "../../atoms/ButtonAtom";
import IconAtom from "../../atoms/IconAtom";
import ModalAtom from "../../atoms/ModalAtom";
import SwitchAtom from "../../atoms/SwitchAtom";
import IconTitleAction from "../../moleculars/IconTitleAction";
import MainTitleChildren from "../../moleculars/MainTitleChildren";

export default function CommonSetting() {
  const appContextState = React.useContext(AppContextState);
  const appContextDispatch = React.useContext(AppContextDispatch);

  const [patientNumber, setPatientNumber] = React.useState<number>();
  const [patientName, setPatientName] = React.useState<string>(undefined);
  const [isPpdUpKo, setPpdUpKo] = React.useState<boolean>(
    appContextState.settingData.setting.ppdOrderType.up === PPD_ORDER_UP.ko
  );
  const [isPpdDownHako, setPpdDownHako] = React.useState<boolean>(
    appContextState.settingData.setting.ppdOrderType.down ===
      PPD_ORDER_DOWN.hako
  );
  const [isAutoMove, setAutoMove] = React.useState<boolean>(
    appContextState.settingData.setting.isAutoMove
  );

  // 初期データ読込処理
  React.useEffect(() => {
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

  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setPatientNumber(
      appContextState.currentPerson.patientNumber
    );
  };

  // ユーザーの削除
  const payment = async () => {};

  // データの初期化
  const initData = async () => {
    AlertAtom(
      "初期化",
      "全てのデータが削除されますがよろしいですか？",
      async () => {
        // 全体データの更新
        appContextDispatch.setModalNumber(0);
        await appContextDispatch.deletePerson();
        Alert.alert("初期化しました");
      }
    );
  };

  // ユーザーの削除
  const deletePatientData = async () => {
    AlertAtom(
      "ユーザー削除",
      `[${
        patientNumber + ":" + (patientName ?? "")
      }]を削除しますがよろしいですか？`,
      async () => {
        // 全体データの更新
        appContextDispatch.setModalNumber(0);
        await appContextDispatch.deletePerson(appContextState.patientNumber);
        Alert.alert("削除しました");
      }
    );
  };

  // 検査データの削除
  const deleteInspectionData = async () => {
    AlertAtom(
      "検査データ削除",
      `検査データを削除しますがよろしいですか？`,
      async () => {
        appContextDispatch.setModalNumber(0);
        await appContextDispatch.deletePerson(
          undefined,
          appContextState.inspectionDataNumber
        );
        Alert.alert("削除しました");
      }
    );
  };

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
        <MainTitleChildren title={"共通設定設定"} style={{ marginBottom: 16 }}>
          <IconTitleAction
            title={"自動タブ移動"}
            icon={<IconAtom name={"autorenew"} type="material-icons" />}
          >
            <SwitchAtom
              onValueChange={() => saveAutoMove(!isAutoMove)}
              value={isAutoMove}
            />
          </IconTitleAction>
        </MainTitleChildren>
        <MainTitleChildren title={"PPD詳細設定"} style={{ marginBottom: 16 }}>
          <IconTitleAction
            title={
              "上歯の順序：" + (isPpdUpKo ? "コ(左上から)" : "Ｚ(左上から)")
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
              "下歯の順序：" + (isPpdDownHako ? "匚(右下から)" : "コ(左下から)")
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
        <MainTitleChildren title={"データ管理"} style={{ marginBottom: 16 }}>
          <IconTitleAction
            title={"月額課金"}
            icon={<IconAtom name="payment" type="material-icon" />}
          >
            <ButtonAtom
              onPress={payment}
              style={{ backgroundColor: "pink", padding: 12 }}
            >
              有料
            </ButtonAtom>
          </IconTitleAction>
        </MainTitleChildren>
        <MainTitleChildren title={"データ削除"} style={{ marginBottom: 32 }}>
          <IconTitleAction
            title={"ユーザー"}
            icon={<IconAtom name="deleteuser" type="ant-design" />}
          >
            <ButtonAtom
              onPress={deletePatientData}
              style={{ backgroundColor: "red", padding: 12 }}
            >
              削除
            </ButtonAtom>
          </IconTitleAction>
          <IconTitleAction
            title={"検査データ"}
            icon={<IconAtom name="delete" type="ant-design" />}
          >
            <ButtonAtom
              onPress={deleteInspectionData}
              style={{ backgroundColor: "red", padding: 12 }}
            >
              削除
            </ButtonAtom>
          </IconTitleAction>
          <IconTitleAction
            title={"全データの初期化"}
            icon={<IconAtom name="delete-forever" type="material-icon" />}
          >
            <ButtonAtom
              onPress={initData}
              style={{ backgroundColor: "red", padding: 12 }}
            >
              削除
            </ButtonAtom>
          </IconTitleAction>
        </MainTitleChildren>
      </ScrollView>
    </ModalAtom>
  );
}

const styles = StyleSheet.create({});
