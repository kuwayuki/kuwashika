import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DropdownType } from "./components/atoms/DropDownPickerAtom";
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
    setPatients([
      { label: "新規", value: 0 },
      { label: "1", value: 1 },
      { label: "2", value: 2 },
    ]);

    setInspectionData([
      { label: "新規追加", value: 0 },
      { label: "2021/11/06 初診", value: 1 },
    ]);
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
