import * as React from "react";
import { View } from "react-native";
import { TEETH_DOWN, TEETH_TYPE, TEETH_UP } from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import { PpdContext } from "../../pages/PpdPage";
import PpdOneBlockTeeth from "./PpdOneBlockTeeth";

export default function PpdAllTeeth() {
  const ppdContext = React.useContext(PpdContext);

  const onTouchMtAction = (teethNum: number) => {
    if (ppdContext.pressedValue !== 100) return;

    // MT用歯のグループクリック時
    let temp = [...ppdContext.mtTeethNums];
    if (ppdContext.mtTeethNums.includes(teethNum)) {
      temp = temp.filter((mtTeethNum) => mtTeethNum !== teethNum);
    } else {
      temp.push(teethNum);
    }
    ppdContext.setMtTeethNums(temp);
  };

  return (
    <View
      style={{
        margin: 3,
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
              mtTeethNums={ppdContext.mtTeethNums}
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
              mtTeethNums={ppdContext.mtTeethNums}
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
