import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../../../App";
import {
  DataType,
  INIT_PERSON,
  INIT_SETTING_DATA,
  SettingType,
} from "../../../constants/Util";
import { DropdownType } from "../../atoms/DropDownPickerAtom";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";

export default function CommonSetting() {
  const appContext = React.useContext(AppContext);
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
    appContext.setPatients(temp);
    appContext.setPatientNumber(patientNumber);

    // // 全体データの更新
    // appContext.registSettingData({
    //   setting: patientNumber,
    //   data: INIT_PERSON,
    // } as DataType);

    // モーダルを閉じる
    appContext.setModalNumber(0);
  };

  // データの初期化
  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContext.setModalNumber(0);
    appContext.setPatientNumber(appContext.currentPerson.patientNumber);
  };

  // データの初期化
  const initData = async () => {
    // 全体データの更新
    appContext.setModalNumber(0);
    await appContext.deletePerson();
  };

  // ユーザーの削除
  const deletePatientData = async () => {
    appContext.setModalNumber(0);
    await appContext.deletePerson(appContext.patientNumber);
  };

  return (
    <ModalAtom>
      <View>
        <TitleAndAction title={"患者番号"} style={{ marginBottom: 16 }}>
          <TextInputAtom
            autoFocus={true}
            keyboardType={"phone-pad"}
            value={patientNumber?.toString()}
            style={{ fontSize: 18 }}
            onChangeText={(num) => setPatientNumber(Number(num))}
          />
        </TitleAndAction>
        <TitleAndAction title={"患者名称"} style={{ marginBottom: 16 }}>
          <TextInputAtom
            value={patientName}
            onChangeText={setPatientName}
            style={{ fontSize: 18 }}
          />
        </TitleAndAction>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <PressableAtom
          style={[styles.button, styles.buttonClose]}
          onPress={initData}
          value={"初期化"}
        />
        <PressableAtom
          style={[styles.button, styles.buttonClose]}
          onPress={deletePatientData}
          value={"ユーザー削除"}
        />
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
    </ModalAtom>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    margin: 8,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
