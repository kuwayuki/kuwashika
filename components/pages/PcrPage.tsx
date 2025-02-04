import { createContext, useContext, useEffect, useState } from "react";
import { AppContextDispatch, AppContextState } from "../../App";
import { TEETH_TYPE } from "../../constants/Constant";
import { PersonDataType } from "../../constants/Util";
import { RootTabScreenProps } from "../../types";
import PcrTemplate from "../templates/PcrTemplate";

export type pcrContextState = {
  focusNumber: number;
  teethValues: TEETH_TYPE[]; // 192の歯
  teethValuesSimple: TEETH_TYPE[]; // 32の歯
};
export const PcrContextState = createContext({} as pcrContextState);

export type pcrContextDispatch = {
  setFocusNumber: (focusNumber: number) => void;
  setTeethValues: (teethValues: TEETH_TYPE[]) => void;
  setTeethValuesSimple: (teethValues: TEETH_TYPE[]) => void;
  setTeethValue: (
    index: number,
    teethValue: TEETH_TYPE,
    isPrecision?: boolean
  ) => void;
  moveNavigation: () => void;
};
export const PcrContextDispatch = createContext({} as pcrContextDispatch);

export default function PcrPage({ navigation }: RootTabScreenProps<"TabPCR">) {
  const appContextState = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);

  const [focusNumber, setFocusNumber] = useState(0);
  const [teethValues, setTeethValues] = useState<TEETH_TYPE[]>([]);
  const [teethValuesSimple, setTeethValuesSimple] = useState<TEETH_TYPE[]>([]);

  /**
   * 患者データから表示再読み込み
   */
  useEffect(() => {
    // navigation.navigate("TabPeriodontal");
    setFocusNumber(0);
  }, [
    appContextState.patientNumber,
    appContextState.inspectionDataNumber,
    appContextState.isPrecision,
  ]);

  /**
   * 患者データから表示再読み込み
   */
  useEffect(() => {
    if (!appContextState.currentPerson) return;

    const temp: TEETH_TYPE[] = [
      ...appContextState.currentPerson.currentData.PCR.precision,
    ];
    for (let i = 0; i < 128; i++) {
      temp[i] = {
        ...temp[i],
        index: i,
        teethRow: Math.floor(i / 64),
        teethGroupIndex: Math.floor(i / 4),
      } as TEETH_TYPE;
    }
    setTeethValues(temp);

    const temp2: TEETH_TYPE[] = [
      ...appContextState.currentPerson.currentData.PCR.basic,
    ];
    for (let i = 0; i < 128; i++) {
      temp2[i] = {
        ...temp2[i],
        index: i,
        teethRow: Math.floor(i / 64),
        teethGroupIndex: Math.floor(i / 4),
      } as TEETH_TYPE;
    }
    setTeethValuesSimple(temp2);

    appContextDispatch.setMtTeethNums([
      ...appContextState.currentPerson.currentData.mtTeethNums,
    ]);
    appContextDispatch.setReload(false);
  }, [appContextState.isReload]);

  /** データが変更される度に編集データを更新 */
  useEffect(() => {
    if (!appContextState.currentPerson) return;
    const data: PersonDataType = {
      ...appContextState.currentPerson.currentData,
      PCR: {
        precision: teethValues,
        basic: teethValuesSimple,
      },
    };
    appContextDispatch.setCurrentPersonData(data);
  }, [teethValues, teethValuesSimple]);

  /**
   * 歯に数値を入力した操作
   * @param index
   * @param teethValue
   */
  const setTeethValue = (
    index: number,
    teethValue: TEETH_TYPE,
    isPrecision = false
  ) => {
    const temp = isPrecision ? [...teethValuesSimple] : [...teethValuesSimple]; // FIXME: 直す？
    if (teethValue.value < 10) {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
      } as TEETH_TYPE;
    } else if (teethValue.value === 10) {
      const plus =
        temp[index] && temp[index].value
          ? temp[index].value + 1
          : teethValue.value;
      temp[index] = {
        ...teethValue,
        value: plus,
      } as TEETH_TYPE;
    } else if (teethValue.value === 11) {
      const plus =
        temp[index] && temp[index].value
          ? temp[index].value - 1
          : teethValue.value;
      temp[index] = {
        ...teethValue,
        value: plus,
      } as TEETH_TYPE;
    } else {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
      } as TEETH_TYPE;
    }
    isPrecision
      ? setTeethValuesSimple([...temp])
      : setTeethValuesSimple([...temp]); // FIXME: 直す？
  };
  const moveNavigation = () => {
    appContextDispatch.setModalNumber(100);
  };

  return (
    <PcrContextState.Provider
      value={{
        focusNumber,
        teethValues,
        teethValuesSimple,
      }}
    >
      <PcrContextDispatch.Provider
        value={{
          setFocusNumber,
          setTeethValues,
          setTeethValue,
          setTeethValuesSimple,
          moveNavigation,
        }}
      >
        <PcrTemplate />
      </PcrContextDispatch.Provider>
    </PcrContextState.Provider>
  );
}
