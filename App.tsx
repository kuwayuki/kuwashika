import * as FileSystem from "expo-file-system";
import { FileInfo } from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DropdownType } from "./components/atoms/DropDownPickerAtom";
import CommonInspection from "./components/organisms/common/CommonInspection";
import CommonPatient from "./components/organisms/common/CommonPatient";
import CommonSetting from "./components/organisms/common/CommonSetting";
import { DATA_FILE, SETTING_FILE } from "./constants/Constant";
import {
  DataType,
  DateFormat,
  formatDate,
  InitSettingData,
  INIT_PERSON,
  INIT_SETTING_DATA,
  PersonDataType,
  PersonNumberType,
  PersonType,
} from "./constants/Util";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// 全ページの共通項目
export type appContext = {
  isReload: boolean;
  setReload: (isRelaod: boolean) => void;
  isInitRead: boolean;
  setInitRead: (isInitRead: boolean) => void;
  settingData: DataType;
  setSettingData: (settingData: DataType) => void;
  currentPerson: PersonType;
  setCurrentPerson: (currentPerson: PersonType) => void;
  setCurrentPersonData: (currentData: PersonDataType) => void;
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
  registSettingData: (settingData?: DataType) => void;
  registPatientData: (currentPerson: PersonType) => void;
  mtTeethNums: number[];
  setMtTeethNums: (mtTeethNums: number[]) => void;
  pressedValue: number;
  setPressedValue: (pressedValue: number) => void;
  deletePerson: (patientNumber?: number) => void;
};
export const AppContext = React.createContext({} as appContext);

export default function App() {
  const [currentPerson, setCurrentPerson] = React.useState<PersonType>();
  const [settingData, setSettingData] = React.useState<DataType>(undefined);
  const [inspectionDate, setInspectionDate] = React.useState(new Date());
  const [modalNumber, setModalNumber] = React.useState(0);
  const [patientNumber, setPatientNumber] = React.useState(-1);
  const [patients, setPatients] = React.useState([]);
  const [inspectionDataNumber, setInspectionDataNumber] = React.useState(0);
  const [inspectionData, setInspectionData] = React.useState([]);
  const [isPrecision, setPrecision] = React.useState(false);
  const [isInitRead, setInitRead] = React.useState(false);
  const [isReload, setReload] = React.useState(false);
  const [mtTeethNums, setMtTeethNums] = React.useState<number[]>([]);
  const [pressedValue, setPressedValue] = React.useState(-1);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const setCurrentPersonData = (currentData: PersonDataType) => {
    const data = [];
    const isUpdate = [...currentPerson.data].some(
      (personData) =>
        personData.inspectionDataNumber === currentData.inspectionDataNumber
    );
    [...currentPerson.data].forEach((personData) => {
      personData.inspectionDataNumber === currentData.inspectionDataNumber
        ? data.push(currentData)
        : data.push(personData);
    });

    // 新規の場合は追加
    if (!isUpdate) data.push(currentData);
    setCurrentPerson({
      ...currentPerson,
      data: data,
      currentData: currentData,
    } as PersonType);
  };

  // 初期データ読込処理
  React.useEffect(() => {
    reloadData(true);
  }, []);

  // データ自動保存
  React.useEffect(() => {
    if (!isInitRead) return;
    registPatientData(currentPerson);
  }, [currentPerson?.data]);

  // 設定データ自動保存
  React.useEffect(() => {
    if (!isInitRead || !settingData) return;
    registSettingData(settingData);
  }, [settingData]);

  // 患者番号変更処理
  React.useEffect(() => {
    const read = async () => {
      if (!isInitRead) return;

      // 検査データと内部データを全て変更
      if (patientNumber !== 0 && settingData.persons) {
        const person = settingData.persons.find(
          (person) => person.patientNumber === patientNumber
        );
        await reloadPersonData(person);
        setReload(true);
        return;
      }

      // 新規の場合
      setModalNumber(1);
    };
    read();
  }, [patientNumber]);

  // 検査データ変更処理
  React.useEffect(() => {
    if (!isInitRead || !currentPerson) return;

    // 検査データと内部データを全て変更
    if (inspectionDataNumber !== 0) {
      const personData = currentPerson.data.find(
        (data) => data.inspectionDataNumber === inspectionDataNumber
      );
      reloadPersonInspectionData(
        personData ??
          ({
            ...INIT_PERSON,
            inspectionDataNumber: inspectionDataNumber,
          } as PersonDataType)
      );
      setReload(true);
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
      const result: FileInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + SETTING_FILE
      );
      if (result.exists) {
        const data = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + SETTING_FILE
        );
        refleshData = JSON.parse(data) as DataType;
      } else {
        refleshData = { ...INIT_SETTING_DATA };
        registSettingData(refleshData);
      }
      setInitRead(true);
    } else {
      refleshData = { ...settingData };
    }
    setSettingData(refleshData);

    // 患者番号をセット
    const patients = [{ label: "新規", value: 0 }];
    refleshData.persons.forEach((person) =>
      patients.push({
        label: person.patientNumber.toString(),
        value: person.patientNumber,
      })
    );
    setPatients(patients);

    if (isFileReload) setPatientNumber(patients[1].value);
  };

  /**
   * 患者番号変更時の処理
   * 検査データと内部データの変更
   * @param personNumber
   */
  const reloadPersonData = async (personNumber: PersonNumberType) => {
    let refleshData: PersonDataType[];
    const dataName =
      FileSystem.documentDirectory + personNumber.patientNumber + DATA_FILE;

    const result: FileInfo = await FileSystem.getInfoAsync(dataName);
    // 存在する場合は読み込み
    if (result.exists) {
      const readData = await FileSystem.readAsStringAsync(dataName);
      refleshData = JSON.parse(readData) as PersonDataType[];
      setInitRead(true);
    } else {
      // 存在しない場合は初期データを書き込み
      refleshData = [INIT_PERSON];
      registPatientData({
        patientNumber: personNumber.patientNumber,
        data: refleshData,
      } as PersonType);
    }

    // 検査データ
    const inspectionData = [{ label: "新規追加", value: 0 }];
    refleshData.forEach((data) =>
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
    reloadPersonInspectionData(refleshData, personNumber);
  };

  /**
   * 検査データ変更時の処理
   *
   * @param personData
   */
  const reloadPersonInspectionData = (
    personData?: PersonDataType | PersonDataType[],
    personNumber?: PersonNumberType
  ) => {
    const isPersonData = Array.isArray(personData);
    const currentData = isPersonData
      ? personData[personData.length - 1]
      : personData;

    // 現在の表示ユーザーをセット
    setCurrentPerson({
      ...currentPerson,
      patientNumber: personNumber?.patientNumber ?? currentPerson.patientNumber,
      data: isPersonData ? personData : currentPerson.data,
      currentData: currentData,
    } as PersonType);

    // 検査データ
    setInspectionDataNumber(currentData.inspectionDataNumber);
    // 検査日
    setInspectionDate(currentData.date);
    // 基本 or 精密
    setPrecision(currentData.isPrecision);
    // MT(欠損)
    setMtTeethNums(currentData.mtTeethNums);
  };

  // 初期データが存在しない場合は、初期データを生成
  const deletePerson = async (patientNumber?: number) => {
    if (patientNumber) {
      // 指定ユーザーのみ削除
      await FileSystem.deleteAsync(
        FileSystem.documentDirectory + patientNumber + DATA_FILE
      );
      const patient = [...settingData.persons].filter(
        (person) => person.patientNumber !== patientNumber
      );
      const settingTemp: DataType = { ...settingData, persons: patient };
      setSettingData(settingTemp);
    } else {
      // 全データ削除
      await Promise.all(
        [...patients].map((patient: DropdownType) =>
          FileSystem.deleteAsync(
            FileSystem.documentDirectory + patient.value + DATA_FILE
          )
        )
      );
      await FileSystem.deleteAsync(FileSystem.documentDirectory + SETTING_FILE);
      // setSettingData(InitSettingData());
    }
    await reloadData(true);
  };

  /**
   * Jsonデータをデータベースに保存
   * @param settingData
   */
  const registSettingData = async (settingData: DataType) => {
    // ファイル書き込み
    FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + SETTING_FILE,
      JSON.stringify(settingData)
    );
    setSettingData(settingData);
  };

  /**
   * Jsonデータをデータベースに保存
   * @param currentPerson
   */
  const registPatientData = (currentPerson: PersonType) => {
    let writeData: PersonDataType[] = [...currentPerson.data];
    // ファイル書き込み
    FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + currentPerson.patientNumber + DATA_FILE,
      JSON.stringify(writeData)
    );
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider
        value={{
          isReload,
          setReload,
          isInitRead,
          setInitRead,
          settingData,
          setSettingData,
          currentPerson,
          setCurrentPerson,
          setCurrentPersonData,
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
          registSettingData,
          registPatientData,
          mtTeethNums,
          setMtTeethNums,
          pressedValue,
          setPressedValue,
          deletePerson,
        }}
      >
        {modalNumber === 1 && <CommonPatient />}
        {modalNumber === 2 && <CommonInspection />}
        {modalNumber === 100 && <CommonSetting />}
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
