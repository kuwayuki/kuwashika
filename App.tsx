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
  settingData: DataType;
  setSettingData: (settingData: DataType) => void;
  currentPerson: PersonType;
  setCurrentPerson: (currentPerson: PersonType) => void;
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
  registSettingData: (settingData: DataType) => void;
  registPatientData: (currentPerson: PersonType) => void;
  mtTeethNums: number[];
  setMtTeethNums: (mtTeethNums: number[]) => void;
  pressedValue: number;
  setPressedValue: (pressedValue: number) => void;
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
  const [mtTeethNums, setMtTeethNums] = React.useState<number[]>([]);
  const [pressedValue, setPressedValue] = React.useState(-1);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // 初期データ読込処理
  React.useEffect(() => {
    reloadData(true);
  }, []);

  // データ自動保存
  React.useEffect(() => {
    if (!isInitRead) return;
    registPatientData(currentPerson);
  }, [currentPerson?.data]);

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
      reloadPersonInspectionData(personData);
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

    if (isFileReload) setPatientNumber(1);
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
      const data = await FileSystem.readAsStringAsync(dataName);
      refleshData = JSON.parse(data) as PersonDataType[];
      setInitRead(true);
    } else {
      // 存在しない場合は初期データを書き込み
      refleshData = [INIT_PERSON];
      await registPatientData({
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
    reloadPersonInspectionData(refleshData[refleshData.length - 1]);
  };

  /**
   * 検査データ変更時の処理
   *
   * @param personData
   */
  const reloadPersonInspectionData = (personData: PersonDataType) => {
    // 検査データ
    setInspectionDataNumber(personData.inspectionDataNumber);
    // 検査日
    setInspectionDate(personData.date);
    // 基本 or 精密
    setPrecision(personData.isPrecision);

    // 現在の表示ユーザーをセット
    setCurrentPerson({
      ...currentPerson,
      currentData: personData,
    } as PersonType);
  };

  const initAction = async () => {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + SETTING_FILE);
    await reloadData(true);
    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + SETTING_FILE,
      JSON.stringify(InitSettingData())
    );
  };

  /**
   * Jsonデータをデータベースに保存
   * @param settingData
   */
  const registSettingData = async (settingData?: DataType) => {
    // 初期データが存在しない場合は、初期データを生成
    if (!settingData) {
      await initAction();
      return;
    }
    // ファイル書き込み
    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + SETTING_FILE,
      JSON.stringify(settingData)
    );
    setSettingData(settingData);
  };

  /**
   * Jsonデータをデータベースに保存
   * @param currentPerson
   */
  const registPatientData = async (currentPerson: PersonType) => {
    let writeData: PersonDataType[] = [...currentPerson.data];

    // // 編集中患者情報を取得
    // const patientEdit = tempAllData.persons.find(
    //   (person) => person.patientNumber === currentPerson.patientNumber
    // );
    // // 全患者情報を取得
    // const personsAll = [...tempAllData.persons];

    // // 患者番号が存在しない場合は患者ごと追加
    // if (!patientEdit) {
    //   personsAll.push({
    //     patientNumber: currentPerson.patientNumber,
    //     data: [currentPerson.data],
    //   } as PersonType);
    //   // 患者情報を追加
    //   writeData = { ...tempAllData, persons: personsAll };
    // } else {
    //   // 既存患者データの編集
    //   const newPersons: PersonType[] = [];
    //   let newPatientData = [];
    //   const patientDataEdit = [...patientEdit.data].find(
    //     (data) =>
    //       data.inspectionDataNumber === currentPerson.data.inspectionDataNumber
    //   );
    //   if (!patientDataEdit) {
    //     // 患者データが存在しない場合は追加
    //     newPatientData = [
    //       ...patientEdit.data,
    //       { ...currentPerson.data } as PersonDataType,
    //     ];
    //   } else {
    //     // 患者データが存在する場合は変更
    //     [...patientEdit.data].forEach(
    //       (data) =>
    //         data !== patientDataEdit
    //           ? newPatientData.push(data) // そのままデータを突っ込む
    //           : newPatientData.push(currentPerson.data) // 編集後のデータを突っ込む
    //     );
    //   }
    //   personsAll.forEach(
    //     (person) =>
    //       person.patientNumber !== patientEdit.patientNumber
    //         ? newPersons.push(person) // 変更患者以外はそのまま
    //         : newPersons.push({
    //             ...patientEdit,
    //             data: newPatientData,
    //           } as PersonType) // 変更患者は変更後データを設定
    //   );
    //   writeData = { ...tempAllData, persons: newPersons };
    // }

    // ファイル書き込み
    await FileSystem.writeAsStringAsync(
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
          settingData,
          setSettingData,
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
          registSettingData,
          registPatientData,
          mtTeethNums,
          setMtTeethNums,
          pressedValue,
          setPressedValue,
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
