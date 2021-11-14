import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DropdownType } from "./components/atoms/DropDownPickerAtom";
import CommonPatient from "./components/organisms/common/CommonPatient";
import {
  DataType,
  InitJsonData,
  PersonCurrentType,
  PersonDataType,
} from "./constants/Util";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// 全ページの共通項目
export type appContext = {
  currentPerson: PersonCurrentType;
  setCurrentPerson: (currentPerson: PersonCurrentType) => void;
  modalNumber: number;
  setModalNumber: (modalNumber: number) => void;
  inspectionDate: Date;
  setInspectionDate: (inspectionDate: Date) => void;
  patients: DropdownType[];
  setPatients: (patientNumber: DropdownType[]) => void;
  patientNumber: number;
  setPatientNumber: (patientNumber: number) => void;
  inspectionDataNumber: number;
  setInspectionDataNumber: (inspectionData: number) => void;
  inspectionData: DropdownType[];
  setInspectionData: (inspectionData: DropdownType[]) => void;
  isPrecision: boolean;
  setPrecision: (isPrecision: boolean) => void;
};
export const AppContext = React.createContext({} as appContext);

export default function App() {
  const [currentPerson, setCurrentPerson] = React.useState<PersonCurrentType>();
  const [allDataJson, setAllDataJson] = React.useState<DataType>(undefined);
  const [inspectionDate, setInspectionDate] = React.useState(new Date());
  const [modalNumber, setModalNumber] = React.useState(0);
  const [patientNumber, setPatientNumber] = React.useState(0);
  const [patients, setPatients] = React.useState([]);
  const [inspectionDataNumber, setInspectionDataNumber] = React.useState(0);
  const [inspectionData, setInspectionData] = React.useState([]);
  const [isPrecision, setPrecision] = React.useState(false);
  const [isInitRead, setInitRead] = React.useState(false);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // 初期データ読込処理
  React.useEffect(() => {
    const write = async () => {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "database.json",
        JSON.stringify(InitJsonData())
      );
    };
    write();

    reloadData(true);
  }, []);

  // 患者番号変更処理
  React.useEffect(() => {
    if (!isInitRead) return;

    // 検査データと内部データを全て変更
    if (patientNumber !== 0 && allDataJson.person) {
      const person = allDataJson.person.find(
        (person) => person.patientNumber === patientNumber
      );
      reloadPersonData(person.data);
      return;
    }

    // 新規の場合
    setModalNumber(1);
  }, [patientNumber]);

  // 検査データ変更処理
  React.useEffect(() => {
    if (!isInitRead) return;

    // 検査データと内部データを全て変更
    if (
      inspectionDataNumber !== 0 &&
      allDataJson.person &&
      allDataJson.person.length
    ) {
      const person = allDataJson.person.find(
        (person) => person.patientNumber === patientNumber
      );
      if (!person || !person.data) return;

      const personDataType = person.data.find(
        (data) => data.dataNumber === inspectionDataNumber
      );
      reloadPersonInspectionData(personDataType);
      return;
    }

    // 新規の場合
    setModalNumber(2);
  }, [inspectionDataNumber]);

  /**
   * 全データ変更処理
   * @param isFileReload
   */
  const reloadData = async (isFileReload = false) => {
    let refleshData: DataType;
    if (isFileReload) {
      const data = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + "database.json"
      );
      refleshData = JSON.parse(data) as DataType;
      setInitRead(true);
    } else {
      refleshData = { ...allDataJson };
    }
    setAllDataJson(refleshData);

    // 患者番号をセット
    const patients = [{ label: "新規", value: 0 }];
    refleshData.person.forEach((person) =>
      patients.push({
        label: person.patientNumber.toString(),
        value: person.patientNumber,
      })
    );
    setPatients(patients);

    // 患者番号変更処理
    if (refleshData.person.length) reloadPersonData(refleshData.person[0].data);

    if (isFileReload) setPatientNumber(1);
  };

  /**
   * 患者番号変更時の処理
   * 検査データと内部データの変更
   * @param personData
   */
  const reloadPersonData = async (personData: PersonDataType[]) => {
    // 検査データ
    const inspectionData = [
      { label: "新規追加", value: 0 },
      // { label: "Sc後", value: 1 },
      // { label: "SRP後", value: 2 },
      // { label: "SRP/P重防", value: 3 },
      // { label: "任意入力", value: 10 },
    ];
    personData.forEach((data) =>
      inspectionData.push({
        label: data.dataName.toString(),
        value: data.dataNumber,
      })
    );
    setInspectionData(inspectionData);

    // 検査データの最後のをセット
    reloadPersonInspectionData(personData[personData.length - 1]);
  };

  /**
   * 検査データ変更時の処理
   *
   * @param personData
   */
  const reloadPersonInspectionData = (personData: PersonDataType) => {
    if (!personData) return;
    // 検査データ
    setInspectionDataNumber(personData.dataNumber);
    // 検査日
    setInspectionDate(personData.date);
    // 基本 or 精密
    setPrecision(personData.isPrecision);

    // 現在の表示ユーザーをセット
    setCurrentPerson({
      patientNumber: patientNumber,
      data: personData,
    } as PersonCurrentType);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider
        value={{
          currentPerson,
          setCurrentPerson,
          modalNumber,
          setModalNumber,
          inspectionDate,
          setInspectionDate,
          patients,
          setPatients,
          patientNumber,
          setPatientNumber,
          inspectionDataNumber,
          setInspectionDataNumber,
          inspectionData,
          setInspectionData,
          isPrecision,
          setPrecision,
        }}
      >
        {modalNumber === 1 && <CommonPatient />}
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
