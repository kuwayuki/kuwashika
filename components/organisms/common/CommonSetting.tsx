import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import { PPD_ORDER_DOWN, PPD_ORDER_UP } from "../../../constants/Util";
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
    appContextDispatch.registSettingData({
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

  // データの初期化
  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setPatientNumber(
      appContextState.currentPerson.patientNumber
    );
  };

  // データの初期化
  const initData = async () => {
    // 全体データの更新
    appContextDispatch.setModalNumber(0);
    await appContextDispatch.deletePerson();
  };

  // ユーザーの削除
  const deletePatientData = async () => {
    appContextDispatch.setModalNumber(0);
    await appContextDispatch.deletePerson(appContextState.patientNumber);
  };

  // 検査データの削除
  const deleteInspectionData = async () => {
    appContextDispatch.setModalNumber(0);
    await appContextDispatch.deletePerson(
      undefined,
      appContextState.inspectionDataNumber
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
        }}
      >
        <MainTitleChildren title={"PPD詳細設定"}>
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
        <MainTitleChildren title={"データ管理"}>
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
            title={"初期化"}
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
