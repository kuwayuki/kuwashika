import * as FileSystem from "expo-file-system";
import deepEqual from "deep-equal";
import { FileInfo } from "expo-file-system";
import { initializeApp } from "firebase/app";
import { StatusBar } from "expo-status-bar";
import Purchases, { CustomerInfo, LOG_LEVEL } from "react-native-purchases";
import {
  getTrackingPermissionsAsync,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";
import { Alert, LogBox, Platform } from "react-native"; // TODO: 後で消す
import React, { useCallback, useEffect, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DropdownType } from "./components/atoms/DropDownPickerAtom";
import CommonInspection from "./components/organisms/common/CommonInspection";
import CommonPatient from "./components/organisms/common/CommonPatient";
import CommonSetting from "./components/organisms/common/CommonSetting";
import { DATA_FILE, SETTING_FILE, firebaseConfig } from "./constants/Constant";
import {
  DataType,
  DateFormat,
  formatDate,
  INIT_PERSON,
  INIT_SETTING_DATA,
  isAndroid,
  parseDate,
  PersonDataType,
  PersonNumberType,
  PersonType,
} from "./constants/Util";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import CommonAuth from "./components/organisms/common/CommonAuth";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";

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
  isPremium: boolean;
  isAdmobShow: boolean;
  user: User;
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
  setPremium: (isPremium: boolean) => void;
  setAdmobShow: (isAdmobShow: boolean) => void;
  setUser: (user: User) => void;
};
export const AppContextDispatch = React.createContext({} as appContextDispatch);
export const app = initializeApp(firebaseConfig);

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
  const [isPremium, setPremium] = React.useState(false);
  const [isAdmobShow, setAdmobShow] = React.useState(false);
  const [user, setUser] = React.useState(null);

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

  useEffect(() => {
    (async () => {
      const { granted, canAskAgain } = await getTrackingPermissionsAsync();
      if (!granted && canAskAgain && !isAndroid()) {
        Alert.alert(
          "許可することで広告が最適化",
          "トラッキングを許可することで、マネーフォロー内の広告が適切に最適化され、関連性の高い広告が表示されます。\n\nまた、アプリ作者に広告収入が発生するので、このアプリの改善に使用します。",
          [
            {
              text: "OK",
              onPress: async () => {
                const { status } = await requestTrackingPermissionsAsync();
                if (status === "granted") {
                  console.log("Yay! I have user permission to track data");
                }
              },
            },
          ]
        );
      }
    })();
  }, []);

  // 初期データ読込処理
  useEffect(() => {
    if (!isInitRead) reloadData(true, false);
  }, [isInitRead]);

  useEffect(() => {
    if (user && isPremium && isInitRead) {
      reloadData(false);
    }
  }, [user, isPremium, isInitRead]);

  useEffect(() => {
    if (user && isPremium && isInitRead) {
      console.log("reload DB");
      reloadData(false, undefined, true);
    }
  }, [settingData?.persons?.length, currentPerson?.data?.length]);

  useEffect(() => {
    const f = async () => {
      if (user && isPremium && isInitRead) {
        console.log("初回データ書き込み");
        const initDB = await getDB();
        // 初回ログイン時はDBのデータを書き込む
        if (!initDB) {
          await saveDB(settingData);
        }
        // 未保存の患者データはすべてDBに書き込み
        for (const person of settingData.persons) {
          const initPersonDB = await getDB(person.patientNumber);
          if (!initPersonDB) {
            const readData = await getFileData(person.patientNumber);
            if (readData) {
              await saveDB(readData, person.patientNumber);
            }
          }
        }
      }
    };
    f();
  }, [isPremium]);

  const checkPremium = (customerInfo: CustomerInfo) => {
    if (typeof customerInfo.entitlements.active.Premium !== "undefined") {
      return true;
    }
    // TODO: 後で消す
    return true;
  };

  const initPurchases = useCallback(async () => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    Purchases.configure({ apiKey: "appl_NkrQYcmcIAPLFiwlYVyYtEBegvJ" });
    const customerInfo = await Purchases.getCustomerInfo();
    if (checkPremium(customerInfo)) {
      setPremium(true);
      return;
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ユーザーがサインインしている
        if (user.emailVerified) {
          // メールアドレスが確認されている
          console.log("ログイン中");
        } else {
          // メールアドレスが未確認
          console.log("メールアドレスは未認証です。");
        }
        // TODO: 後で戻す
        setUser(user);
      } else {
        console.log("ログアウト");
        const credential = await signInWithEmailAndPassword(
          auth,
          "ee68028@yahoo.co.jp",
          "kuwa1003"
        );
        setUser(credential.user);

        // TODO: 後で戻す
        // setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    initPurchases();
  }, []);

  // データ自動保存
  useEffect(() => {
    if (!isInitRead) return;
    registPatientData(currentPerson);
  }, [currentPerson?.data]);

  // 設定データ自動保存
  useEffect(() => {
    if (!isInitRead || !settingData) return;
    registSettingData(settingData, true);
  }, [settingData]);

  // データ自動保存
  useEffect(() => {
    if (!settingData?.persons) return;

    // 患者番号をセット
    const patients = [{ label: "新規", value: 0 }];
    let maxLen = 1;
    settingData.persons.forEach((person) => {
      const len = person.patientNumber.toString().length;
      if (len > maxLen) maxLen = len;
    });
    settingData.persons.forEach((person) =>
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

    if (
      !patientNumber ||
      patientNumber === -1 ||
      !settingData.persons.find(
        (person) => person.patientNumber === patientNumber
      )
    )
      setPatientNumber(patients[1].value);
  }, [settingData?.persons]);

  // 患者番号変更処理
  useEffect(() => {
    const read = async () => {
      if (!isInitRead) return;
      if (patientNumber == undefined) {
        setPatientNumber(currentPerson.patientNumber);
        return;
      }

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
  useEffect(() => {
    if (!isInitRead || !currentPerson) return;
    if (inspectionDataNumber == undefined) {
      setInspectionDataNumber(currentPerson.currentData?.inspectionDataNumber);
      return;
    }
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

  // 検査データ変更処理
  useEffect(() => {
    if (!isInitRead || !currentPerson) return;
    saveDB(currentPerson.data, currentPerson.patientNumber);
  }, [inspectionDataNumber]);
  /**
   * 全データリロード処理
   * @param isFileReload
   */
  const reloadData = async (
    isFileReload = false,
    isDBRead = true,
    isDBOnly = false
  ) => {
    let refleshData: DataType;
    if (isDBRead) {
      refleshData = await getDB();
    }
    if (!isDBOnly && !refleshData) {
      if (isFileReload) {
        refleshData = await getFileData();
        if (!refleshData) {
          // 初期データサンプル登録処理
          refleshData = { ...INIT_SETTING_DATA };
        }
        registSettingData(refleshData, true);
        setInitRead(true);
      } else {
        refleshData = { ...settingData };
      }
    }
    if (refleshData) setSettingData(refleshData);
  };

  /**
   * 患者番号変更時の処理
   * 検査データと内部データの変更
   * @param personNumber
   */
  const reloadPersonData = async (personNumber: PersonNumberType) => {
    let refleshData: PersonDataType[];
    refleshData = await getDB(personNumber.patientNumber);
    if (!refleshData) {
      refleshData = await getFileData(personNumber.patientNumber);
      if (refleshData) {
        setInitRead(true);
      } else {
        // 存在しない場合は初期データを書き込み
        refleshData = [INIT_PERSON];
        registPatientData({
          patientNumber: personNumber.patientNumber,
          data: refleshData,
        } as PersonType);
      }
    }

    // 検査データ
    const inspectionData = [{ label: "新規追加", value: 0 }];
    refleshData
      .sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      })
      .forEach((data) =>
        inspectionData.push({
          label:
            formatDate(parseDate(data.date), DateFormat.MM_DD) +
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
    // 指定ユーザーのみ削除
    if (inspectionDataNumber) {
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
      // データ削除(新規以外)
      await deleteDataAllOrPatientRelations(patientNumber);
    }
    await reloadData(true);
  };

  const db = getFirestore(app);

  /**
   * Jsonデータをデータベースに保存
   * @param settingData
   */
  const registSettingData = async (settingData: DataType, isSaveDB = false) => {
    setSettingData(settingData);
    writeFileData(settingData);
    if (isSaveDB) saveDB(settingData);
  };

  /**
   * DB削除処理（患者削除時/初期化）
   */
  const deleteDataAllOrPatientRelations = async (tmpPatientNumber?: number) => {
    if (tmpPatientNumber !== undefined) {
      const tmpSettingData = (await getDB()) ?? settingData;
      const patient = [...tmpSettingData.persons].filter(
        (person) => person.patientNumber !== tmpPatientNumber
      );
      setSettingData({ ...tmpSettingData, persons: patient });
      await deleteFileData(tmpPatientNumber);
      await deleteDB(tmpPatientNumber);
    } else {
      await deleteDB();
      settingData.persons.forEach((person) => {
        deleteFileData(person.patientNumber);
      });
      await deleteFileData();
      setInitRead(false);
    }
  };

  /**
   * Jsonデータをデータベースに保存
   * @param currentPerson
   */
  const registPatientData = (currentPerson: PersonType) => {
    let writeData: PersonDataType[] = [...currentPerson.data];
    // ファイル書き込み
    writeFileData(writeData, currentPerson.patientNumber);
  };

  /**
   * 全データリロード処理
   * @param isFileReload
   */
  const getFileData = async (patientNumber?: number) => {
    const fileUri =
      patientNumber !== undefined
        ? FileSystem.documentDirectory + patientNumber + DATA_FILE
        : FileSystem.documentDirectory + SETTING_FILE;

    const result: FileInfo = await FileSystem.getInfoAsync(fileUri);
    if (result.exists) {
      const data = await FileSystem.readAsStringAsync(fileUri);
      return JSON.parse(data);
    }
  };

  const writeFileData = async (data: any, patientNumber?: number) => {
    const fileUri =
      patientNumber !== undefined
        ? FileSystem.documentDirectory + patientNumber + DATA_FILE
        : FileSystem.documentDirectory + SETTING_FILE;

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
  };

  const deleteFileData = async (patientNumber?: number) => {
    const fileUri =
      patientNumber !== undefined
        ? FileSystem.documentDirectory + patientNumber + DATA_FILE
        : FileSystem.documentDirectory + SETTING_FILE;
    try {
      await FileSystem.deleteAsync(fileUri);
    } catch (error) {
      console.log(error);
    }
  };

  const getDB = async (patientNumber?: number) => {
    if (user && isPremium) {
      try {
        console.log(
          (patientNumber ? `患者番号${patientNumber}：` : "全般設定：") +
            "読み込む"
        );
        const docRef = doc(
          db,
          "users",
          patientNumber ? `${user.uid}_${patientNumber}` : user.uid
        );
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return undefined;
        return docSnap.data().data;
      } catch (error) {
        console.error("Error reading user data: ", error);
      }
    }
    return undefined;
  };

  /**
   * 下記のタイミングでDBに保存する
   * １．全般設定：初回及び、下記全般
   * ２．患者番号／検査データ：患者番号の変更時／検査データの変更時
   * ※全般設定は患者番号が増減した場合に、他の環境から読み込んで変更する必要があるので注意
   * @param data
   * @param patientNumber
   * @returns
   */
  const saveDB = async (data: any, patientNumber?: number) => {
    if (user && isPremium && isInitRead && data) {
      try {
        // console.log(
        //   (patientNumber ? `患者番号${patientNumber}：` : "全般設定：") +
        //     "書き込む"
        // );
        if (
          patientNumber &&
          !settingData.persons.find(
            (person) => person.patientNumber === patientNumber
          )
        )
          return;

        const docRef = doc(
          db,
          "users",
          patientNumber ? `${user.uid}_${patientNumber}` : user.uid
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && deepEqual(docSnap.data().data, data)) {
          console.log("データが同じため、書き込みません。");
          return;
        }
        await setDoc(docRef, { data: data });
        console.log(
          (patientNumber ? `患者番号${patientNumber}：` : "全般設定：") +
            "書き込みました"
        );
      } catch (error) {
        console.error("Error adding user data: ", error);
      }
    }
  };

  /**
   * 初期化及び、患者データの削除時
   * @param patientNumber
   *
   */
  const deleteDB = async (patientNumber?: number) => {
    if (user && isPremium) {
      console.log(
        (patientNumber ? `患者番号${patientNumber}：` : "全般設定：") + "削除"
      );
      try {
        if (patientNumber) {
          await deleteDoc(
            doc(
              db,
              "users",
              patientNumber ? `${user.uid}_${patientNumber}` : user.uid
            )
          );
        } else {
          const querySnapshot = await getDocs(collection(db, "users"));
          const deleteIds: string[] = [];
          querySnapshot.forEach((doc) => {
            if (doc.id.startsWith(user.uid)) deleteIds.push(doc.id);
          });
          await Promise.all(
            deleteIds.map((deleteId) => {
              deleteDoc(doc(db, "users", deleteId));
            })
          );
        }
      } catch (error) {
        console.error("Error deleting user data: ", error);
      }
    }
  };

  const appContextStateValue = useMemo(
    () => ({
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
      isPremium,
      isAdmobShow,
      user,
    }),
    [
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
      isPremium,
      isAdmobShow,
      user,
    ]
  );

  const setMtTeethNumsMemoized = useCallback(
    (newValue: number[]) => {
      setMtTeethNums(newValue);
    },
    [setMtTeethNums]
  );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContextState.Provider value={appContextStateValue}>
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
            setMtTeethNums: setMtTeethNumsMemoized,
            setPressedValue,
            deletePerson,
            setPremium,
            setAdmobShow,
            setUser,
          }}
        >
          {modalNumber === 1 && <CommonPatient />}
          {modalNumber === 2 && <CommonInspection />}
          {modalNumber === 100 && <CommonSetting />}
          {modalNumber === 101 && <CommonAuth />}
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </AppContextDispatch.Provider>
      </AppContextState.Provider>
    );
  }
}
