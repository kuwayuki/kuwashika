import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import { admobReward } from "../../../constants/Admob";
import { INIT_PERSON, PersonType } from "../../../constants/Util";
import { DropdownType } from "../../atoms/DropDownPickerAtom";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";

export default function CommonPatient() {
  const appContextState = React.useContext(AppContextState);
  const appContextDispatch = React.useContext(AppContextDispatch);

  const [patientNumber, setPatientNumber] = React.useState<number>(undefined);
  const [patientName, setPatientName] = React.useState<string>(undefined);

  const savePatient = () => {
    if (
      appContextState.patients
        .map((patient) => patient.value)
        .includes(patientNumber)
    ) {
      alert("この患者番号は既に存在します");
      return;
    }

    // 患者番号の追加
    const temp: DropdownType[] = [...appContextState.patients];
    temp.push({
      label: patientNumber.toString() + ":" + (patientName ?? ""),
      value: patientNumber,
    });
    appContextDispatch.setPatients(temp);
    appContextDispatch.setPatientNumber(patientNumber);

    // 全体データの更新
    appContextDispatch.registPatientData({
      patientNumber: patientNumber,
      data: [INIT_PERSON],
    } as PersonType);

    // 全体データの更新
    appContextDispatch.registSettingData({
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
