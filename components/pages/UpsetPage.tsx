import * as React from "react";
import { AppContext } from "../../App";
import { TEETH_TYPE } from "../../constants/Constant";
import { PersonDataType } from "../../constants/Util";
import { RootTabScreenProps } from "../../types";
import UpsetTemplate from "../templates/UpsetTemplate";

export type upsetContext = {
  focusNumber: number;
  setFocusNumber: (focusNumber: number) => void;
  teethValuesSimple: TEETH_TYPE[]; // 32の歯
  setTeethValuesSimple: (teethValues: TEETH_TYPE[]) => void;
  setTeethValue: (index: number, teethValue: TEETH_TYPE) => void;
};
export const UpsetContext = React.createContext({} as upsetContext);

export default function UpsetPage({
  navigation,
}: RootTabScreenProps<"TabUpset">) {
  const appContext = React.useContext(AppContext);

  const [focusNumber, setFocusNumber] = React.useState(0);
  const [teethValuesSimple, setTeethValuesSimple] = React.useState<
    TEETH_TYPE[]
  >([]);

  /**
   * 患者データから表示再読み込み
   */
  React.useEffect(() => {
    setFocusNumber(0);
  }, [appContext.patientNumber, appContext.inspectionDataNumber]);

  /**
   * 患者データから表示再読み込み
   */
  React.useEffect(() => {
    if (!appContext.currentPerson || !appContext.isReload) return;

    const temp2: TEETH_TYPE[] = [
      ...appContext.currentPerson.currentData.UPSET.basic,
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
      UPSET: {
        basic: teethValuesSimple,
      },
    };
    appContext.setCurrentPersonData(data);
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

  return (
    <UpsetContext.Provider
      value={{
        focusNumber,
        setFocusNumber,
        setTeethValue,
        teethValuesSimple,
        setTeethValuesSimple,
      }}
    >
      <UpsetTemplate />
    </UpsetContext.Provider>
  );
}
