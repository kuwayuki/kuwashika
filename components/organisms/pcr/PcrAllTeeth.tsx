import * as React from "react";
import { View } from "react-native";
import { AppContextState } from "../../../App";
import {
  teethType,
  TEETH_DOWN,
  TEETH_TYPE,
  TEETH_UP,
} from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import { PcrContext } from "../../pages/PcrPage";
import PcrOneBlockTeeth from "./PcrOneBlockTeeth";

export default function PcrAllTeeth() {
  const appContext = React.useContext(AppContextState);
  const pcrContext = React.useContext(PcrContext);

  const onTouchMtAction = (teethGroupIndex: number) => {
    if (pcrContext.focusNumber !== teethGroupIndex * 4) {
      pcrContext.setFocusNumber(teethGroupIndex * 4);
      return;
    }
    const tempTeeths = appContext.isPrecision
      ? [...pcrContext.teethValues]
      : [...pcrContext.teethValuesSimple];
    // PCRの場合は、タッチ時に対象を全て選択・非選択状態にする
    const selectValue = tempTeeths
      .filter((teeth) => teeth.teethGroupIndex === teethGroupIndex)
      .every((teethValue) => teethValue.value === 1)
      ? 0
      : 1;
    const selectTeeths: TEETH_TYPE[] = [];
    tempTeeths.forEach((teeth) => {
      if (teeth.teethGroupIndex === teethGroupIndex) {
        selectTeeths.push({ ...teeth, value: selectValue });
      } else {
        selectTeeths.push(teeth);
      }
    });
    appContext.isPrecision
      ? pcrContext.setTeethValues(selectTeeths)
      : pcrContext.setTeethValuesSimple(selectTeeths);
  };

  const teethBlock = (teeth: teethType) => {
    return (
      <PcrOneBlockTeeth
        teethValues={
          appContext.isPrecision
            ? pcrContext.teethValues
            : pcrContext.teethValuesSimple
        }
        setTeethValue={pcrContext.setTeethValue}
        teethRows={teeth.teethRow}
        teethGroupIndex={teeth.teethGroupIndex}
        isPrecision={appContext.isPrecision}
        focusNumber={pcrContext.focusNumber}
        setFocusNumber={pcrContext.setFocusNumber}
      />
    );
  };

  const teethRow = (teeth: teethType, isUp: boolean) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isUp && teethBlock(teeth)}
          <TextReadMolecular
            value={teeth.teethNum.toString()}
            onTouchEnd={() => onTouchMtAction(teeth.teethGroupIndex)}
            teethGroupIndex={teeth.teethGroupIndex}
            mtTeethNums={appContext.mtTeethNums}
            isHideNum={true}
          />
          {!isUp && teethBlock(teeth)}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        margin: 3,
        marginRight: 8,
      }}
    >
      {/* 上段 */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {TEETH_UP.map((teeth) => teethRow(teeth, true))}
      </View>
      {/* 下段 */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {TEETH_DOWN.map((teeth) => teethRow(teeth, false))}
      </View>
    </View>
  );
}
