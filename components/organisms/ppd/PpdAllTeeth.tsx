import * as React from "react";
import { View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import { teethType, TEETH_DOWN, TEETH_UP } from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import { PpdContextDispatch, PpdContextState } from "../../pages/PpdPage";
import PpdOneBlockTeeth from "./PpdOneBlockTeeth";

export default function PpdAllTeeth() {
  const appContextState = React.useContext(AppContextState);
  const appContextDispatch = React.useContext(AppContextDispatch);

  const ppdContextState = React.useContext(PpdContextState);
  const ppdContextDispatch = React.useContext(PpdContextDispatch);

  const onTouchMtAction = (teethNum: number) => {
    if (appContextState.pressedValue !== 100) return;

    // MT用歯のグループクリック時
    let temp = [...appContextState.mtTeethNums];
    if (appContextState.mtTeethNums.includes(teethNum)) {
      temp = temp.filter((mtTeethNum) => mtTeethNum !== teethNum);
    } else {
      temp.push(teethNum);
    }
    appContextDispatch.setMtTeethNums(temp);
  };

  const teethBlock = (teeth: teethType) => {
    return (
      <PpdOneBlockTeeth
        teethValues={
          appContextState.isPrecision
            ? ppdContextState.teethValues
            : ppdContextState.teethValuesSimple
        }
        setTeethValue={ppdContextDispatch.setTeethValue}
        teethRows={teeth.teethRow}
        teethGroupIndex={teeth.teethGroupIndex}
        isPrecision={appContextState.isPrecision}
        focusNumber={ppdContextState.focusNumber}
        setFocusNumber={ppdContextDispatch.setFocusNumber}
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
            mtTeethNums={appContextState.mtTeethNums}
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
