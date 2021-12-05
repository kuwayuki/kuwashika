import * as React from "react";
import { AppContext } from "../../App";
import { TEETH_TYPE } from "../../constants/Constant";
import { PersonDataType, PersonType } from "../../constants/Util";
import { RootTabScreenProps } from "../../types";
import PcrTemplate from "../templates/PcrTemplate";

export type pcrContext = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  teethValues: TEETH_TYPE[]; // 192の歯
  setTeethValues: (teethValues: TEETH_TYPE[]) => void;
  teethValuesSimple: TEETH_TYPE[]; // 32の歯
  setTeethValuesSimple: (teethValues: TEETH_TYPE[]) => void;
  setTeethValue: (
    index: number,
    teethValue: TEETH_TYPE,
    isPrecision?: boolean
  ) => void;
};
export const PcrContext = React.createContext({} as pcrContext);

export default function PcrPage({ navigation }: RootTabScreenProps<"TabPCR">) {
  const appContext = React.useContext(AppContext);

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
    appContext.patientNumber,
    appContext.inspectionDataNumber,
    appContext.isPrecision,
  ]);

  /**
   * 患者データから表示再読み込み
   */
  React.useEffect(() => {
    if (!appContext.currentPerson || !appContext.isReload) return;

    const temp: TEETH_TYPE[] = [
      ...appContext.currentPerson.currentData.PCR.precision,
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
      ...appContext.currentPerson.currentData.PCR.basic,
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

    appContext.setMtTeethNums([
      ...appContext.currentPerson.currentData.mtTeethNums,
    ]);
    appContext.setReload(false);
  }, [appContext.isReload]);

  /** データが変更される度に編集データを更新 */
  React.useEffect(() => {
    if (!appContext.currentPerson) return;
    const data: PersonDataType = {
      ...appContext.currentPerson.currentData,
      PCR: {
        precision: teethValues,
        basic: teethValuesSimple,
      },
    };
    appContext.setCurrentPersonData(data);
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

  return (
    <PcrContext.Provider
      value={{
        focusNumber,
        setFocusNumber,
        teethValues,
        setTeethValues,
        setTeethValue,
        teethValuesSimple,
        setTeethValuesSimple,
      }}
    >
      <PcrTemplate />
    </PcrContext.Provider>
  );
}
