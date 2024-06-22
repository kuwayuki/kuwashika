import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import {
  INIT_PERSON,
  PersonNumberType,
  PersonType,
} from "../../../constants/Util";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";
import { LIMIT_COUNT } from "../../../constants/Constant";
import { showInterstitialAd } from "../../../constants/AdmobInter";
import { showRewardInterstitialAd } from "../../../constants/AdmobRewardInter";
import { i18n } from "../../locales/i18n";

export default function CommonPatient() {
  const appContextState = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);

  const [patientNumber, setPatientNumber] = useState<number>(undefined);
  const [patientName, setPatientName] = useState<string>(undefined);

  const savePatient = () => {
    if (!patientNumber || !patientName)
      return alert(i18n.t("patient.patient_number_required"));

    if (
      appContextState.patients
        .map((patient) => patient.value)
        .includes(patientNumber)
    ) {
      alert(i18n.t("patient.patient_number_exists"));
      return;
    }

    // 患者追加時は広告を表示
    if (
      !appContextState.isPremium &&
      appContextState.patients.length > LIMIT_COUNT.ADMOB_MAX_PATIENTS
    ) {
      // showInterstitialAd();
      showRewardInterstitialAd(func);
    } else {
      func();
    }
  };

  const func = async () => {
    appContextDispatch.setPatientNumber(patientNumber);

    // 全体データの更新
    appContextDispatch.registPatientData({
      patientNumber: patientNumber,
      data: [INIT_PERSON],
    } as PersonType);

    const persons = [...appContextState.settingData.persons];
    let isInclude = false;
    const addPerson: PersonNumberType = {
      patientNumber: patientNumber,
      patientName: patientName,
    };
    persons.forEach((person) => {
      if (person.patientNumber === patientNumber) {
        person.patientName = addPerson.patientName;
        person.isDeleted = false;
        isInclude = true;
      }
    });
    if (!isInclude) persons.push(addPerson);
    // 全体データの更新
    appContextDispatch.setSettingData({
      ...appContextState.settingData,
      persons: persons,
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
        <TitleAndAction
          title={i18n.t("patient.patient_number")}
          style={{ marginBottom: 16 }}
        >
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
        <TitleAndAction
          title={i18n.t("patient.patient_name")}
          style={{ marginBottom: 16 }}
        >
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
          value={i18n.t("common.add")}
        />
        <PressableAtom
          style={[styles.button, styles.buttonClose]}
          onPress={cancel}
          value={i18n.t("common.cancel")}
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
