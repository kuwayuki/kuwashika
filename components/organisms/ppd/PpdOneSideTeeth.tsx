import * as React from "react";
import { View } from "react-native";
import { TEETH_ALL, TEETH_STATUS } from "../../../constants/Constant";
import TextInputSmallMolecular from "../../moleculars/TextInputSmallMolecular";
import { PpdContext } from "../../pages/PpdPage";

export type teethProps = {
  teethRows: number;
  teethIndex: number;
  textInputs: any[];
};

export const PPD_PARTS = [0, 1, 2];

/**
 * 横３マス
 * @returns
 */
export default function PpdOneSideTeeth(props: teethProps) {
  const ppdContext = React.useContext(PpdContext);

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
      {PPD_PARTS.map((count) => (
        <TextInputSmallMolecular
          {...props}
          value={ppdContext.teethValues[indexInit + count]?.display ?? ""}
          focusNumber={ppdContext.focusNumber}
          setFocusNumber={ppdContext.setFocusNumber}
          teethPartsIndex={indexInit + count}
          teethIndex={props.teethIndex}
          mtTeethNums={ppdContext.mtTeethNums}
          blurOnSubmit={false}
        />
      ))}
    </View>
  );
}
