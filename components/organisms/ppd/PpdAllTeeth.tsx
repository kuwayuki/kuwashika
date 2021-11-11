import * as React from "react";
import { View } from "react-native";
import { TEETH_ALL } from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import { PpdContext } from "../../pages/PpdPage";
import PpdOneBlockTeeth from "./PpdOneBlockTeeth";

export default function PpdAllTeeth() {
  const ppdContext = React.useContext(PpdContext);

  const onTouchAction = (teethNum: number) => {
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
        display: "flex",
        flexDirection: "row",
        margin: 3,
      }}
    >
      {TEETH_ALL.map((teeth) => (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 上段 */}
          <PpdOneBlockTeeth teethRows={0} teethIndex={teeth.teethIndex} />
          <TextReadMolecular
            value={teeth.teethNum.toString()}
            onTouchEnd={() => onTouchAction(teeth.teethIndex)}
            teethGroupIndex={teeth.teethIndex}
          />
          <TextReadMolecular
            value={teeth.teethNum.toString()}
            onTouchEnd={() =>
              onTouchAction(teeth.teethIndex + TEETH_ALL.length)
            }
            teethGroupIndex={teeth.teethIndex}
            // mtTeethNums={ppdContext.mtTeethNums}
          />
          {/* 下段 */}
          <PpdOneBlockTeeth teethRows={1} teethIndex={teeth.teethIndex} />
        </View>
      ))}
    </View>
  );
}
