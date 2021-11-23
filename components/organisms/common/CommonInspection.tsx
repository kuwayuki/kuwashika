import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../../../App";
import { INSPACTION_ITEMS } from "../../../constants/Constant";
import { PersonCurrentType } from "../../../constants/Util";
import DropDownPickerAtom, {
  DropdownType,
} from "../../atoms/DropDownPickerAtom";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";

export default function CommonInspection() {
  const appContext = React.useContext(AppContext);
  const [inspectionDataKindNumber, setInspectionDataKindNumber] =
    React.useState<number>(undefined);
  const [inspectionName, setInspectionName] = React.useState<string>(undefined);

  React.useEffect(() => {
    const items = INSPACTION_ITEMS.map((item) => item.value);
    const index =
      items.indexOf(appContext.currentPerson.data.inspectionDataKindNumber) + 1;
    setInspectionDataKindNumber(INSPACTION_ITEMS[index < 3 ? index : 0].value);
  }, []);

  const savePatient = () => {
    const currentPerson = appContext.allDataJson.persons.find(
      (person) =>
        person.patientNumber === appContext.currentPerson.patientNumber
    );
    const numbers = currentPerson.data.map((data) => data.inspectionDataNumber);
    const nextDataNumber = Math.max(...numbers) + 1;

    // 検査データの追加
    const temp: DropdownType[] = [...appContext.inspectionData];
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
    appContext.setInspectionData(temp);
    appContext.setInspectionDataNumber(nextDataNumber);

    const patientData = {
      ...appContext.currentPerson,
      data: {
        ...appContext.currentPerson.data,
        date: new Date(),
        inspectionDataNumber: nextDataNumber,
        inspectionDataKindNumber: inspectionDataKindNumber,
        inspectionDataName: addData.label,
      },
    } as PersonCurrentType;

    // 全体データの更新
    appContext.setRegistDatabase(patientData);

    // モーダルを閉じる
    appContext.setModalNumber(0);
  };
  const cancel = () => {
    // Modalを閉じて、前の検査番号に戻す
    appContext.setModalNumber(0);
    appContext.setInspectionDataNumber(
      appContext.currentPerson.data.inspectionDataNumber
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
            title={"検査名称"}
            style={{ marginBottom: 16, zIndex: 1001 }}
          >
            <TextInputAtom
              value={inspectionName}
              onChangeText={setInspectionName}
              style={{ fontSize: 18 }}
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
