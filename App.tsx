import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DropdownType } from "./components/atoms/DropDownPickerAtom";
import CommonInspection from "./components/organisms/common/CommonInspection";
import CommonPatient from "./components/organisms/common/CommonPatient";
import {
  DataType,
  DateFormat,
  formatDate,
  InitJsonData,
  INIT_PERSON,
  PersonCurrentType,
  PersonDataType,
  PersonType,
} from "./constants/Util";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// 全ページの共通項目
export type appContext = {
  allDataJson: DataType;
  setAllDataJson: (allDataJson: DataType) => void;
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
  setRegistDatabase: (currentPerson: PersonCurrentType) => void;
  mtTeethNums: number[];
  setMtTeethNums: (mtTeethNums: number[]) => void;
  pressedValue: number;
  setPressedValue: (pressedValue: number) => void;
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
  const [mtTeethNums, setMtTeethNums] = React.useState<number[]>([]);
  const [pressedValue, setPressedValue] = React.useState(-1);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // 初期データ読込処理
  React.useEffect(() => {
    // setRegistDatabase(undefined); // データリセット
    reloadData(true);
  }, []);

  // データ自動保存
  React.useEffect(() => {
    if (!isInitRead) return;
    setRegistDatabase(currentPerson);
  }, [currentPerson]);

  // 患者番号変更処理
  React.useEffect(() => {
    if (!isInitRead) return;

    // 検査データと内部データを全て変更
    if (patientNumber !== 0 && allDataJson.persons) {
      const person = allDataJson.persons.find(
        (person) => person.patientNumber === patientNumber
      );
      reloadPersonData(person?.data ?? [INIT_PERSON]);
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
      allDataJson.persons &&
      allDataJson.persons.length
    ) {
      const person = allDataJson.persons.find(
        (person) => person.patientNumber === patientNumber
      );
      if (!person || !person.data) return;

      const personDataType = person.data.find(
        (data) => data.inspectionDataNumber === inspectionDataNumber
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
    refleshData.persons.forEach((person) =>
      patients.push({
        label: person.patientNumber.toString(),
        value: person.patientNumber,
      })
    );
    setPatients(patients);

    // 患者番号変更処理
    if (refleshData.persons.length)
      reloadPersonData(refleshData.persons[0].data);

    if (isFileReload) setPatientNumber(1);
  };

  /**
   * 患者番号変更時の処理
   * 検査データと内部データの変更
   * @param personData
   */
  const reloadPersonData = async (personData: PersonDataType[]) => {
    // 検査データ
    const inspectionData = [{ label: "新規追加", value: 0 }];
    personData.forEach((data) =>
      inspectionData.push({
        label:
          formatDate(data.date, DateFormat.MM_DD) +
          ":" +
          data.inspectionDataName,
        value: data.inspectionDataNumber,
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
    setInspectionDataNumber(personData.inspectionDataNumber);
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

  /**
   * Jsonデータをデータベースに保存
   * @param currentPerson
   */
  const setRegistDatabase = async (currentPerson?: PersonCurrentType) => {
    // 初期データが存在しない場合は、初期データを生成
    if (!currentPerson) {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "database.json",
        JSON.stringify(InitJsonData())
      );
      return;
    }

    // 全データをコピー取得して、加工
    const tempAllData = { ...allDataJson };
    let writeData: DataType;

    // 編集中患者情報を取得
    const patientEdit = tempAllData.persons.find(
      (person) => person.patientNumber === currentPerson.patientNumber
    );
    // 全患者情報を取得
    const personsAll = [...tempAllData.persons];

    // 患者番号が存在しない場合は患者ごと追加
    if (!patientEdit) {
      personsAll.push({
        patientNumber: currentPerson.patientNumber,
        data: [currentPerson.data],
      } as PersonType);
      // 患者情報を追加
      writeData = { ...tempAllData, persons: personsAll };
    } else {
      // 既存患者データの編集
      const newPersons: PersonType[] = [];
      let newPatientData = [];
      const patientDataEdit = [...patientEdit.data].find(
        (data) =>
          data.inspectionDataNumber === currentPerson.data.inspectionDataNumber
      );
      if (!patientDataEdit) {
        // 患者データが存在しない場合は追加
        newPatientData = [
          ...patientEdit.data,
          { ...currentPerson.data } as PersonDataType,
        ];
      } else {
        // 患者データが存在する場合は変更
        [...patientEdit.data].forEach(
          (data) =>
            data !== patientDataEdit
              ? newPatientData.push(data) // そのままデータを突っ込む
              : newPatientData.push(currentPerson.data) // 編集後のデータを突っ込む
        );
      }
      personsAll.forEach(
        (person) =>
          person.patientNumber !== patientEdit.patientNumber
            ? newPersons.push(person) // 変更患者以外はそのまま
            : newPersons.push({
                ...patientEdit,
                data: newPatientData,
              } as PersonType) // 変更患者は変更後データを設定
      );
      writeData = { ...tempAllData, persons: newPersons };
    }

    // ファイル書き込み
    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "database.json",
      JSON.stringify(writeData)
    );
    setAllDataJson(writeData);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider
        value={{
          allDataJson,
          setAllDataJson,
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
          setRegistDatabase,
          mtTeethNums,
          setMtTeethNums,
          pressedValue,
          setPressedValue,
        }}
      >
        {modalNumber === 1 && <CommonPatient />}
        {modalNumber === 2 && <CommonInspection />}
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
