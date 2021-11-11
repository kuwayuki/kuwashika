import * as React from "react";
import { View } from "react-native";
import { AppContext } from "../../../App";
import { TEETH_ALL, TEETH_TYPE } from "../../../constants/Constant";
import TextInputLargeMolecular from "../../moleculars/TextInputLargeMolecular";
import TextInputSmallMolecular from "../../moleculars/TextInputSmallMolecular";
import { PpdContext } from "../../pages/PpdPage";

export type teethProps = {
  teethRows: number; // 基本：1～２列：精密１～４列
  teethIndex: number; // 0 ～ 16番目のグループ
};

export const PPD_PARTS = [0, 1, 2];

/**
 * 横３マス
 * @returns
 */
export default function PpdOneSideTeeth(props: teethProps) {
  const ppdContext = React.useContext(PpdContext);
  const appContext = React.useContext(AppContext);

  // (16 x 段番号 + 歯のグループ番号)
  const indexInit =
    TEETH_ALL.length * props.teethRows * 3 + props.teethIndex * 3;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {appContext.isPrecision ? (
        // 精密
        PPD_PARTS.map((count) => (
          <TextInputSmallMolecular
            {...props}
            value={
              ppdContext.teethValues[indexInit + count]?.value?.toString() ?? ""
            }
            focusNumber={ppdContext.focusNumber}
            setFocusNumber={ppdContext.setFocusNumber}
            teethValue={ppdContext.teethValues[indexInit + count]}
            mtTeethNums={ppdContext.mtTeethNums}
            blurOnSubmit={false}
          />
        ))
      ) : (
        // 基本
        <TextInputLargeMolecular
          {...props}
          value={
            ppdContext.teethValuesSimple[indexInit]?.value?.toString() ?? ""
          }
          focusNumber={ppdContext.focusNumber}
          setFocusNumber={ppdContext.setFocusNumber}
          teethValue={ppdContext.teethValues[indexInit]}
          mtTeethNums={ppdContext.mtTeethNums}
          blurOnSubmit={false}
        />
      )}
    </View>
  );
}
