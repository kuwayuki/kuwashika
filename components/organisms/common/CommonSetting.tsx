import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import { AppContextDispatch, AppContextState } from "../../../App";
import { DropdownType } from "../../atoms/DropDownPickerAtom";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import SwitchAtom from "../../atoms/SwitchAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";

export default function CommonSetting() {
  const appContext = React.useContext(AppContextState);
  const appContextDispatch = React.useContext(AppContextDispatch);

  const [patientNumber, setPatientNumber] = React.useState<number>();
  const [patientName, setPatientName] = React.useState<string>(undefined);

  // 初期データ読込処理
  React.useEffect(() => {
    setPatientNumber(appContext.patientNumber);
    const patient = appContext.settingData.persons.find(
      (patient) => patient.patientNumber === appContext.patientNumber
    );
    setPatientName(patient?.patientName);
  }, []);

  const savePatient = () => {
    if (
      appContext.patients
        .map((patient) => patient.value)
        .includes(patientNumber)
    ) {
      alert("この患者番号は既に存在します");
      return;
    }

    // 患者番号の追加
    const temp: DropdownType[] = [...appContext.patients];
    temp.push({ label: patientNumber.toString(), value: patientNumber });
    appContextDispatch.setPatients(temp);
    appContextDispatch.setPatientNumber(patientNumber);

    // // 全体データの更新
    // appContext.registSettingData({
    //   setting: patientNumber,
    //   data: INIT_PERSON,
    // } as DataType);

    // モーダルを閉じる
    appContextDispatch.setModalNumber(0);
  };

  // データの初期化
  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setPatientNumber(appContext.currentPerson.patientNumber);
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
    await appContextDispatch.deletePerson(appContext.patientNumber);
  };

  // 検査データの削除
  const deleteInspectionData = async () => {
    appContextDispatch.setModalNumber(0);
    await appContextDispatch.deletePerson(
      undefined,
      appContext.inspectionDataNumber
    );
  };

  return (
    <ModalAtom>
      <View
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Card>
          <View
            style={{
              height: "60%",
              display: "flex",
              justifyContent: "flex-start",
              margin: 20,
            }}
          >
            <TitleAndAction title={appContext.isPrecision ? "精密" : "基本"}>
              <SwitchAtom
                onValueChange={() =>
                  appContextDispatch.setPrecision(!appContext.isPrecision)
                }
                value={appContext.isPrecision}
              />
            </TitleAndAction>
          </View>
        </Card>
        {/* <View>
          <TitleAndAction title={"患者番号"} style={{ marginBottom: 16 }}>
            <TextInputAtom
              keyboardType={"phone-pad"}
              value={patientNumber?.toString()}
              style={{ fontSize: 18 }}
              onChangeText={(num) =>
                setPatientNumber(num ? Number(num) : undefined)
              }
            />
          </TitleAndAction>
          <TitleAndAction title={"患者名称"} style={{ marginBottom: 16 }}>
            <TextInputAtom
              value={patientName}
              onChangeText={setPatientName}
              style={{ fontSize: 18 }}
            />
          </TitleAndAction>
        </View> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <PressableAtom
              style={[styles.button, styles.buttonDelete]}
              onPress={initData}
              value={"初期化"}
            />
            <PressableAtom
              style={[styles.button, styles.buttonDelete]}
              onPress={deletePatientData}
              value={"ユーザー削除"}
            />
            <PressableAtom
              style={[styles.button, styles.buttonDelete]}
              onPress={deleteInspectionData}
              value={"検査データ削除"}
            />
          </View>
          <View style={{ flexGrow: 1 }}></View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <PressableAtom
              style={[styles.button, styles.buttonClose]}
              onPress={savePatient}
              value={"更新"}
            />
            <PressableAtom
              style={[styles.button, styles.buttonClose]}
              onPress={cancel}
              value={"キャンセル"}
            />
          </View>
        </View>
      </View>
    </ModalAtom>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    margin: 8,
    marginRight: 16,
    padding: 16,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonDelete: {
    backgroundColor: "#FF3366",
  },
});
