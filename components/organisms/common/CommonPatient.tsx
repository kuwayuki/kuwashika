import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import { INIT_PERSON, PersonType } from "../../../constants/Util";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";
import { LIMIT_COUNT } from "../../../constants/Constant";

export default function CommonPatient() {
  const appContextState = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);

  const [patientNumber, setPatientNumber] = useState<number>(undefined);
  const [patientName, setPatientName] = useState<string>(undefined);

  const savePatient = () => {
    if (
      appContextState.patients
        .map((patient) => patient.value)
        .includes(patientNumber)
    ) {
      alert("この患者番号は既に存在します");
      return;
    }

    // 患者追加時は広告を表示
    if (appContextState.patients.length > LIMIT_COUNT.ADMOB_MAX_PATIENTS) {
      appContextDispatch.setAdmobShow(true);
    }

    // // 患者番号の追加
    // const temp: DropdownType[] = [...appContextState.patients];
    // temp.push({
    //   label: patientNumber.toString() + ":" + (patientName ?? ""),
    //   value: patientNumber,
    // });
    // appContextDispatch.setPatients(temp);
    appContextDispatch.setPatientNumber(patientNumber);

    // 全体データの更新
    appContextDispatch.registPatientData({
      patientNumber: patientNumber,
      data: [INIT_PERSON],
    } as PersonType);

    // 全体データの更新
    appContextDispatch.setSettingData({
      ...appContextState.settingData,
      persons: [
        ...appContextState.settingData.persons,
        { patientNumber: patientNumber, patientName: patientName },
      ],
    });

    // モーダルを閉じる
    appContextDispatch.setModalNumber(0);
  };
  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setPatientNumber(
      appContextState.currentPerson.patientNumber
    );
  };

  return (
    <ModalAtom>
      <View>
        <TitleAndAction title={"患者番号"} style={{ marginBottom: 16 }}>
          <TextInputAtom
            autoFocus={true}
            keyboardType={"phone-pad"}
            value={patientNumber?.toString() ?? ""}
            style={{ fontSize: 18 }}
            onChangeText={(num) =>
              setPatientNumber(num ? Number(num) : undefined)
            }
            isTextInput={true}
          />
        </TitleAndAction>
        <TitleAndAction title={"患者名称"} style={{ marginBottom: 16 }}>
          <TextInputAtom
            value={patientName}
            onChangeText={setPatientName}
            style={{ fontSize: 18 }}
            isTextInput={true}
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
