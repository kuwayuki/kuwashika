import * as React from "react";
import { AppContextDispatch, AppContextState } from "../../App";
import { TEETH_TYPE } from "../../constants/Constant";
import { PersonDataType } from "../../constants/Util";
import { RootTabScreenProps } from "../../types";
import PpdTemplate from "../templates/PpdTemplate";

export type ppdContextState = {
  focusNumber: number;
  teethValues: TEETH_TYPE[]; // 192の歯
  teethValuesSimple: TEETH_TYPE[]; // 32の歯
};
export const PpdContextState = React.createContext({} as ppdContextState);

export type ppdContextDispatch = {
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
export const PpdContextDispatch = React.createContext({} as ppdContextDispatch);

export default function PpdPage({
  navigation,
}: RootTabScreenProps<"TabPeriodontal">) {
  const appContextState = React.useContext(AppContextState);
  const appContextDispatch = React.useContext(AppContextDispatch);

  const [focusNumber, setFocusNumber] = React.useState(0);
  const [teethValues, setTeethValues] = React.useState<TEETH_TYPE[]>([]);
  const [teethValuesSimple, setTeethValuesSimple] = React.useState<
    TEETH_TYPE[]
  >([]);

  /**
   * 患者データから表示再読み込み
   */
  React.useEffect(() => {
    setFocusNumber(0);
  }, [
    appContextState.patientNumber,
    appContextState.inspectionDataNumber,
    appContextState.isPrecision,
  ]);

  /**
   * 患者データから表示再読み込み
   */
  React.useEffect(() => {
    if (!appContextState.currentPerson || !appContextState.isReload) return;

    const temp: TEETH_TYPE[] = [
      ...appContextState.currentPerson.currentData.PPD.precision,
    ];
    for (let i = 0; i < 192; i++) {
      temp[i] = {
        ...temp[i],
        index: i,
        teethRow: Math.floor(i / 48),
        teethGroupIndex: Math.floor((i % 48) / 3 + (i < 192 / 2 ? 0 : 16)),
      } as TEETH_TYPE;
    }
    setTeethValues(temp);

    const temp2: TEETH_TYPE[] = [
      ...appContextState.currentPerson.currentData.PPD.basic,
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
  React.useEffect(() => {
    if (!appContextState.currentPerson) return;
    const data: PersonDataType = {
      ...appContextState.currentPerson.currentData,
      PPD: {
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
    const temp = isPrecision ? [...teethValues] : [...teethValuesSimple];
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
    isPrecision ? setTeethValues([...temp]) : setTeethValuesSimple([...temp]);
  };
  const moveNavigation = () => {
    navigation.navigate("TabUpset");
  };

  const ppdContextStateValue = React.useMemo(
    () => ({
      focusNumber,
      teethValues,
      teethValuesSimple,
    }),
    [focusNumber, teethValues, teethValuesSimple]
  );

  return (
    <PpdContextState.Provider value={ppdContextStateValue}>
      <PpdContextDispatch.Provider
        value={{
          setFocusNumber,
          setTeethValues,
          setTeethValue,
          setTeethValuesSimple,
          moveNavigation,
        }}
      >
        <PpdTemplate />
      </PpdContextDispatch.Provider>
    </PpdContextState.Provider>
  );
}
