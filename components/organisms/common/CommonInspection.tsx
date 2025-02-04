import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import { INSPACTION_ITEMS, LIMIT_COUNT } from "../../../constants/Constant";
import DropDownPickerAtom, {
  DropdownType,
} from "../../atoms/DropDownPickerAtom";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";
import { showInterstitialAd } from "../../../constants/AdmobInter";
import { showRewardInterstitialAd } from "../../../constants/AdmobRewardInter";
import { i18n } from "../../locales/i18n";

export default function CommonInspection() {
  const appContextState = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);

  const [inspectionDataKindNumber, setInspectionDataKindNumber] =
    useState<number>(undefined);
  const [inspectionName, setInspectionName] = useState<string>(undefined);

  useEffect(() => {
    const items = INSPACTION_ITEMS.map((item) => item.value);
    const index =
      items.indexOf(
        appContextState.currentPerson.currentData.inspectionDataKindNumber
      ) + 1;
    setInspectionDataKindNumber(INSPACTION_ITEMS[index < 3 ? index : 0].value);
  }, []);

  const func = async () => {
    const currentPerson = appContextState.currentPerson;
    const numbers = currentPerson.data.map((data) => data.inspectionDataNumber);
    const nextDataNumber = Math.max(...numbers) + 1;
    // 検査データの追加
    const temp: DropdownType[] = [...appContextState.inspectionData];
    // 任意入力以外はそのまま設定
    const addData = INSPACTION_ITEMS.find(
      (item) => item.value === inspectionDataKindNumber
    );
    temp.push({
      label:
        inspectionDataKindNumber === INSPACTION_ITEMS[3].value
          ? inspectionName
          : addData.label,
      value: nextDataNumber,
      kind: inspectionDataKindNumber,
    });
    appContextDispatch.setInspectionData(temp);
    appContextDispatch.setInspectionDataNumber(nextDataNumber);

    // 現在データの引き継ぎ
    appContextDispatch.setCurrentPersonData({
      ...appContextState.currentPerson.currentData,
      date: new Date(),
      inspectionDataNumber: nextDataNumber,
      inspectionDataKindNumber: inspectionDataKindNumber,
      inspectionDataName: addData.label,
    });

    // モーダルを閉じる
    appContextDispatch.setModalNumber(0);
  };

  const savePatient = () => {
    // データ追加時は広告を表示
    if (
      !appContextState.isPremium &&
      appContextState.patients.length > LIMIT_COUNT.ADMOB_MAX_PATIENTS
    ) {
      // showInterstitialAd();
      func();
      showRewardInterstitialAd();
    } else {
      func();
    }
  };

  const cancel = () => {
    // Modalを閉じて、前の検査番号に戻す
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setInspectionDataNumber(
      appContextState.currentPerson.currentData.inspectionDataNumber
    );
  };

  return (
    <ModalAtom>
      <View style={{ zIndex: 1000 }}>
        <TitleAndAction
          title={i18n.t("inspection.inspection_data")}
          style={{ marginBottom: 16, zIndex: 1002 }}
        >
          <DropDownPickerAtom
            items={INSPACTION_ITEMS}
            value={inspectionDataKindNumber}
            setValue={setInspectionDataKindNumber}
            width={160}
          />
        </TitleAndAction>
        {inspectionDataKindNumber === INSPACTION_ITEMS[3].value && (
          <TitleAndAction
            title={i18n.t("inspection.inspection_name")}
            style={{ marginBottom: 16, zIndex: 1001 }}
          >
            <TextInputAtom
              value={inspectionName}
              onChangeText={setInspectionName}
              style={{ fontSize: 18 }}
              isTextInput={true}
            />
          </TitleAndAction>
        )}
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
