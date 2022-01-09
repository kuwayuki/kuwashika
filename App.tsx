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
  INIT_PERSON,
  INIT_SETTING_DATA,
  PersonDataType,
  PersonNumberType,
  PersonType,
} from "./constants/Util";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { LogBox } from "react-native"; // TODO: 後で消す

// 全ページの共通項目
export type appContextState = {
  isReload: boolean;
  isInitRead: boolean;
  settingData: DataType;
  currentPerson: PersonType;
  modalNumber: number;
  inspectionDate: Date;
  patients: DropdownType[];
  patientNumber: number;
  inspectionDataNumber: number;
  inspectionData: DropdownType[];
  isPrecision: boolean;
  mtTeethNums: number[];
  pressedValue: number;
};
export const AppContextState = React.createContext({} as appContextState);

// 全ページの共通項目
export type appContextDispatch = {
  setReload: (isRelaod: boolean) => void;
  setInitRead: (isInitRead: boolean) => void;
  setSettingData: (settingData: DataType) => void;
  setCurrentPerson: (currentPerson: PersonType) => void;
  setCurrentPersonData: (currentData: PersonDataType) => void;
  setModalNumber: (modalNumber: number) => void;
  setInspectionDate: (inspectionDate: Date) => void;
  setPatients: (patientNumber: DropdownType[]) => void;
  setPatientNumber: (patientNumber: number) => void;
  setInspectionDataNumber: (inspectionData: number) => void;
  setInspectionData: (inspectionData: DropdownType[]) => void;
  setPrecision: (isPrecision: boolean) => void;
  registSettingData: (settingData?: DataType) => void;
  registPatientData: (currentPerson: PersonType) => void;
  setMtTeethNums: (mtTeethNums: number[]) => void;
  setPressedValue: (pressedValue: number) => void;
  deletePerson: (patientNumber?: number, inspectionDataNumber?: number) => void;
};
export const AppContextDispatch = React.createContext({} as appContextDispatch);

export default function App() {
  LogBox.ignoreAllLogs();
  const [currentPerson, setCurrentPerson] = React.useState<PersonType>();
  const [settingData, setSettingData] = React.useState<DataType>(undefined);
  const [inspectionDate, setInspectionDate] = React.useState(new Date());
  const [modalNumber, setModalNumber] = React.useState(0);
  const [patientNumber, setPatientNumber] = React.useState(-1);
  const [patients, setPatients] = React.useState<DropdownType[]>([]);
  const [inspectionDataNumber, setInspectionDataNumber] = React.useState(0);
  const [inspectionData, setInspectionData] = React.useState<DropdownType[]>(
    []
  );
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
    let maxLen = 1;
    refleshData.persons.forEach((person) => {
      const len = person.patientNumber.toString().length;
      if (len > maxLen) maxLen = len;
    });
    refleshData.persons.forEach((person) =>
      patients.push({
        label:
          person.patientNumber +
          // zeroPadding(person.patientNumber, maxLen) +
          ":" +
          (person.patientName ?? ""),
        value: person.patientNumber,
      })
    );
    setPatients(patients.sort((a, b) => a.value - b.value));

    if (isFileReload) setPatientNumber(patients[1].value);
  };
  function zeroPadding(NUM, LEN) {
    return (Array(LEN).join(" ") + NUM).slice(-LEN);
  }
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
    // refleshData.forEach((data) =>
    refleshData
      .sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      })
      .forEach((data) =>
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
  const deletePerson = async (
    patientNumber?: number,
    inspectionDataNumber?: number
  ) => {
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
    } else if (inspectionDataNumber) {
      // 検査データ除外のみ
      const data = [...currentPerson.data].filter(
        (personData) => personData.inspectionDataNumber !== inspectionDataNumber
      );
      const inspectionTemp = [...inspectionData].filter(
        (inspect) => inspect.value !== inspectionDataNumber
      );
      const index = data.length > 1 ? data.length : 0;
      setInspectionData(inspectionTemp);
      setInspectionDataNumber(index ?? 1);
      setCurrentPerson({
        ...currentPerson,
        data: data,
        currentData: index ? data[index - 1] : INIT_PERSON,
      });
    } else {
      // 全データ削除(新規以外)
      const patientsOnly: DropdownType[] = [...patients].filter(
        (pats: DropdownType) => pats.value
      );
      patientsOnly.forEach((patient: DropdownType) => {
        try {
          FileSystem.deleteAsync(
            FileSystem.documentDirectory + patient.value + DATA_FILE
          );
        } catch (error) {
          console.log(error);
        }
      });
      await FileSystem.deleteAsync(FileSystem.documentDirectory + SETTING_FILE);
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
      <AppContextState.Provider
        value={{
          isReload,
          isInitRead,
          settingData,
          currentPerson,
          modalNumber,
          inspectionDate,
          patients,
          patientNumber,
          inspectionDataNumber,
          inspectionData,
          isPrecision,
          mtTeethNums,
          pressedValue,
        }}
      >
        <AppContextDispatch.Provider
          value={{
            setReload,
            setInitRead,
            setSettingData,
            setCurrentPerson,
            setCurrentPersonData,
            setModalNumber,
            setInspectionDate,
            setPatients,
            setPatientNumber,
            setInspectionDataNumber,
            setInspectionData,
            setPrecision,
            registSettingData,
            registPatientData,
            setMtTeethNums,
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
        </AppContextDispatch.Provider>
      </AppContextState.Provider>
    );
  }
}
