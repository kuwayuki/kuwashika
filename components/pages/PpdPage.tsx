import * as React from "react";
import { AppContext } from "../../App";
import { TEETH_STATUS, TEETH_TYPE } from "../../constants/Constant";
import { RootTabScreenProps } from "../../types";
import PpdTemplate from "../templates/PpdTemplate";

export type ppdContext = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  teethValues: TEETH_TYPE[]; // 192の歯
  setTeethValues: (teethValues: TEETH_TYPE[]) => void;
  setTeethValue: (index: number, teethValue: TEETH_TYPE) => void;
  teethValuesSimple: TEETH_TYPE[]; // 32の歯
  setTeethValuesSimple: (teethValues: TEETH_TYPE[]) => void;
  setTeethValueSimple: (index: number, teethValue: TEETH_TYPE) => void;
  mtTeethNums: number[];
  setMtTeethNums: (mtTeethNums: number[]) => void;
  pressedValue: number;
  setPressedValue: (pressedValue: number) => void;
};
export const PpdContext = React.createContext({} as ppdContext);

export default function PpdPage({
  navigation,
}: RootTabScreenProps<"TabPeriodontal">) {
  const appContext = React.useContext(AppContext);

  const [focusNumber, setFocusNumber] = React.useState(0);
  const [mtTeethNums, setMtTeethNums] = React.useState<number[]>([]);
  const [teethValues, setTeethValues] = React.useState<TEETH_TYPE[]>([]);
  const [teethValuesSimple, setTeethValuesSimple] = React.useState<
    TEETH_TYPE[]
  >([]);
  const [pressedValue, setPressedValue] = React.useState(-1);

  /**
   * 初期値を入力
   * TODO: データから読込
   */
  React.useEffect(() => {
    const temp: TEETH_TYPE[] = [...appContext.currentPerson.data.PPD.precision];
    for (let i = 0; i < 192; i++) {
      temp[i] = {
        ...temp[i],
        index: i,
        teethRow: Math.floor(i / 48),
        teethGroupIndex: Math.floor((i % 48) / 3 + (i < 192 / 2 ? 0 : 16)),
      } as TEETH_TYPE;
    }
    setTeethValues(temp);

    const temp2: TEETH_TYPE[] = [...appContext.currentPerson.data.PPD.basic];
    for (let i = 0; i < 32; i++) {
      temp2[i] = {
        ...temp2[i],
        index: i,
        teethRow: Math.floor(i / 16),
        teethGroupIndex: i,
      } as TEETH_TYPE;
    }
    setTeethValuesSimple(temp2);

    setMtTeethNums([...appContext.currentPerson.data.mtTeethNums]);
  }, [appContext.currentPerson]);

  /**
   * 歯に数値を入力した操作
   * @param index
   * @param teethValue
   */
  const setTeethValue = (index: number, teethValue: TEETH_TYPE) => {
    const temp = [...teethValues];
    if (teethValue.value < 10) {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
        // display: teethValue.value.toString(),
      } as TEETH_TYPE;
    } else if (teethValue.value === 10) {
      const plus =
        temp[index] && temp[index].value
          ? temp[index].value + 1
          : teethValue.value;
      temp[index] = {
        ...teethValue,
        value: plus,
        // display: plus.toString(),
      } as TEETH_TYPE;
    } else if (teethValue.value === 11) {
      const plus =
        temp[index] && temp[index].value
          ? temp[index].value - 1
          : teethValue.value;
      temp[index] = {
        ...teethValue,
        value: plus,
        // display: plus.toString(),
      } as TEETH_TYPE;
    } else {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
        // display: "",
      } as TEETH_TYPE;
    }
    setTeethValues([...temp]);
  };

  const setTeethValueSimple = (index: number, teethValue: TEETH_TYPE) => {
    const temp = [...teethValuesSimple];
    if (teethValue.value < 10) {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
        // display: teethValue.value.toString(),
      } as TEETH_TYPE;
    } else if (teethValue.value === 10) {
      const plus =
        temp[index] && temp[index].value
          ? temp[index].value + 1
          : teethValue.value;
      temp[index] = {
        ...teethValue,
        value: plus,
        // display: plus.toString(),
      } as TEETH_TYPE;
    } else {
      temp[index] = {
        ...teethValue,
        value: teethValue.value,
        // display: "",
      } as TEETH_TYPE;
    }
    setTeethValuesSimple([...temp]);
  };

  return (
    <PpdContext.Provider
      value={{
        focusNumber,
        setFocusNumber,
        teethValues,
        setTeethValues,
        setTeethValue,
        mtTeethNums,
        setMtTeethNums,
        pressedValue,
        setPressedValue,
        teethValuesSimple,
        setTeethValuesSimple,
        setTeethValueSimple,
      }}
    >
      <PpdTemplate />
    </PpdContext.Provider>
  );
}
