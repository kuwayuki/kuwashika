import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DropdownType } from "./components/atoms/DropDownPickerAtom";
import { InitJsonData, JsonDataType } from "./constants/Util";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// 全ページの共通項目
export type appContext = {
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
  const [inspectionDate, setInspectionDate] = React.useState(new Date());
  const [patientNumber, setPatientNumber] = React.useState(0);
  const [patients, setPatients] = React.useState([]);
  const [inspectionDataNumber, setInspectionDataNumber] = React.useState(0);
  const [inspectionData, setInspectionData] = React.useState([]);
  const [isPrecision, setPrecision] = React.useState(false);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    const write = async () => {
      // const fileUri: string = `${FileSystem.documentDirectory}${"myFile.txt"}`;
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "database.json",
        JSON.stringify(InitJsonData())
      );
      // await writeFile();
    };
    write();

    const Read = async () => {
      const data = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + "database.json"
      );
      const object = JSON.parse(data) as JsonDataType;

      // 患者番号
      const patients = [{ label: "新規", value: 0 }];
      object.person.forEach((person) =>
        patients.push({
          label: person.patientNumber.toString(),
          value: person.patientNumber,
        })
      );
      setPatients(patients);

      // 検査データ
      const dataPerson = object.person[0];
      const inspectionData = [{ label: "新規追加", value: 0 }];
      dataPerson.data?.forEach((data) =>
        inspectionData.push({
          label: data.dataName.toString(),
          value: data.dataNumber,
        })
      );
      setInspectionData(inspectionData);

      // 検査日
      setInspectionDate(dataPerson.data[0].date);
    };
    Read();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider
        value={{
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
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
