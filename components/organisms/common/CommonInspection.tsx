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

  const savePatient = () => {
    const currentPerson = appContextState.currentPerson;
    const numbers = currentPerson.data.map((data) => data.inspectionDataNumber);
    const nextDataNumber = Math.max(...numbers) + 1;

    // データ追加時は広告を表示
    if (appContextState.patients.length > LIMIT_COUNT.ADMOB_MAX_PATIENTS) {
      // showInterstitialAd();
      showRewardInterstitialAd();
    }

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
          title={"検査データ"}
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
            title={"検査名称　"}
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
