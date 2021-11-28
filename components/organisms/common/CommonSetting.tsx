import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../../../App";
import { INIT_PERSON, PersonCurrentType } from "../../../constants/Util";
import { DropdownType } from "../../atoms/DropDownPickerAtom";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";

export default function CommonSetting() {
  const appContext = React.useContext(AppContext);
  const [patientNumber, setPatientNumber] = React.useState<number>(undefined);
  const [patientName, setPatientName] = React.useState<string>(undefined);

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

    // 全体データの更新
    appContext.setRegistDatabase({
      patientNumber: patientNumber,
      data: INIT_PERSON,
    } as PersonCurrentType);

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
    appContext.setModalNumber(0);
    appContext.setRegistDatabase(undefined);
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
          onPress={savePatient}
          value={"追加"}
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
