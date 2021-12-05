import * as React from "react";
import { View } from "react-native";
import { AppContext } from "../../../App";
import { teethType, TEETH_DOWN, TEETH_UP } from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import { UpsetContext } from "../../pages/UpsetPage";
import UpsetOneBlockTeeth from "./UpsetOneBlockTeeth";

export default function UpsetAllTeeth() {
  const appContext = React.useContext(AppContext);
  const upsetContext = React.useContext(UpsetContext);

  const onTouchMtAction = (teethNum: number) => {
    if (appContext.pressedValue !== 100) return;

    // MT用歯のグループクリック時
    let temp = [...appContext.mtTeethNums];
    if (appContext.mtTeethNums.includes(teethNum)) {
      temp = temp.filter((mtTeethNum) => mtTeethNum !== teethNum);
    } else {
      temp.push(teethNum);
    }
    appContext.setMtTeethNums(temp);
  };

  const teethBlock = (teeth: teethType) => {
    return (
      <UpsetOneBlockTeeth
        teethValues={upsetContext.teethValuesSimple}
        setTeethValue={upsetContext.setTeethValue}
        teethRows={teeth.teethRow}
        teethGroupIndex={teeth.teethGroupIndex}
        focusNumber={upsetContext.focusNumber}
        setFocusNumber={upsetContext.setFocusNumber}
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
