import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../../../App";
import ModalAtom from "../../atoms/ModalAtom";
import PressableAtom from "../../atoms/PressableAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";

export default function CommonPatient() {
  const appContext = React.useContext(AppContext);
  const [patientNumber, setPatientNumber] = React.useState<number>(undefined);
  const [patientName, setPatientName] = React.useState<string>(undefined);
  const savePatient = () => {
    // Modalを閉じて、患者番号をセット
    appContext.setModalNumber(0);
    appContext.setPatientNumber(patientNumber);

    // TODO:データを保存
  };
  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContext.setModalNumber(0);
    appContext.setPatientNumber(appContext.currentPerson.patientNumber);
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
          />
        </TitleAndAction>
        <TitleAndAction title={"患者名称"} style={{ marginBottom: 16 }}>
          <TextInputAtom value={patientName} style={{ fontSize: 18 }} />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 16,
    margin: 8,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
