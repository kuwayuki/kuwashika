import * as React from "react";
import { View } from "react-native";
import { AppContext } from "../../../App";
import { TEETH_DOWN, TEETH_UP } from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import { PpdContext } from "../../pages/PpdPage";
import PpdOneBlockTeeth from "./PpdOneBlockTeeth";

export default function PpdAllTeeth() {
  const appContext = React.useContext(AppContext);
  const ppdContext = React.useContext(PpdContext);

  const onTouchMtAction = (teethNum: number) => {
    if (ppdContext.pressedValue !== 100) return;

    // MT用歯のグループクリック時
    let temp = [...appContext.mtTeethNums];
    if (appContext.mtTeethNums.includes(teethNum)) {
      temp = temp.filter((mtTeethNum) => mtTeethNum !== teethNum);
    } else {
      temp.push(teethNum);
    }
    appContext.setMtTeethNums(temp);
  };

  return (
    <View
      style={{
        margin: 3,
        marginRight: 8,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* 上段 */}
        {TEETH_UP.map((teeth) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PpdOneBlockTeeth
              teethRows={teeth.teethRow}
              teethGroupIndex={teeth.teethGroupIndex}
            />
            <TextReadMolecular
              value={teeth.teethNum.toString()}
              onTouchEnd={() => onTouchMtAction(teeth.teethGroupIndex)}
              teethGroupIndex={teeth.teethGroupIndex}
              mtTeethNums={appContext.mtTeethNums}
              isHideNum={true}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* 下段 */}
        {TEETH_DOWN.map((teeth) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextReadMolecular
              value={teeth.teethNum.toString()}
              onTouchEnd={() => onTouchMtAction(teeth.teethGroupIndex)}
              teethGroupIndex={teeth.teethGroupIndex}
              mtTeethNums={appContext.mtTeethNums}
              isHideNum={true}
            />
            <PpdOneBlockTeeth
              teethRows={teeth.teethRow}
              teethGroupIndex={teeth.teethGroupIndex}
            />
            {/* 下段 */}
          </View>
        ))}
      </View>
    </View>
  );
}
