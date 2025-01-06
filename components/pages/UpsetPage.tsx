import { createContext, useContext, useEffect, useState } from "react";
import { AppContextDispatch, AppContextState } from "../../App";
import { TEETH_TYPE } from "../../constants/Constant";
import { PersonDataType } from "../../constants/Util";
import { RootTabScreenProps } from "../../types";
import UpsetTemplate from "../templates/UpsetTemplate";

export type upsetContextState = {
  focusNumber: number;
  teethValuesSimple: TEETH_TYPE[]; // 32の歯
};
export const UpsetContextState = createContext({} as upsetContextState);

export type upsetContextDispatch = {
  setFocusNumber: (focusNumber: number) => void;
  setTeethValuesSimple: (teethValues: TEETH_TYPE[]) => void;
  setTeethValue: (index: number, teethValue: TEETH_TYPE) => void;
  moveNavigation: () => void;
};
export const UpsetContextDispatch = createContext({} as upsetContextDispatch);

export default function UpsetPage({
  navigation,
}: RootTabScreenProps<"TabUpset">) {
  const appContextState = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);

  const [focusNumber, setFocusNumber] = useState(0);
  const [teethValuesSimple, setTeethValuesSimple] = useState<TEETH_TYPE[]>([]);

  /**
   * 患者データから表示再読み込み
   */
  useEffect(() => {
    // navigation.navigate("TabPeriodontal");
    setFocusNumber(0);
  }, [appContextState.patientNumber, appContextState.inspectionDataNumber]);

  /**
   * 患者データから表示再読み込み
   */
  useEffect(() => {
    setFocusNumber(0);
  }, []);

  /**
   * 患者データから表示再読み込み
   */
  useEffect(() => {
    if (!appContextState.currentPerson) return;

    const temp2: TEETH_TYPE[] = [
      ...appContextState.currentPerson.currentData.UPSET.basic,
    ];
    for (let i = 0; i < 32; i++) {
      temp2[i] = {
        ...temp2[i],
        index: i,
        teethRow: Math.floor(i / 16),
        teethGroupIndex: i,
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
      UPSET: {
        basic: teethValuesSimple,
      },
    };
    appContextDispatch.setCurrentPersonData(data);
  }, [teethValuesSimple]);

  /**
   * 歯に数値を入力した操作
   * @param index
   * @param teethValue
   */
  const setTeethValue = (index: number, teethValue: TEETH_TYPE) => {
    const temp = [...teethValuesSimple];
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
    setTeethValuesSimple([...temp]);
  };

  const moveNavigation = () => {
    navigation.navigate("TabPCR");
  };

  return (
    <UpsetContextState.Provider
      value={{
        focusNumber,
        teethValuesSimple,
      }}
    >
      <UpsetContextDispatch.Provider
        value={{
          setFocusNumber,
          setTeethValue,
          setTeethValuesSimple,
          moveNavigation,
        }}
      >
        <UpsetTemplate />
      </UpsetContextDispatch.Provider>
    </UpsetContextState.Provider>
  );
}
