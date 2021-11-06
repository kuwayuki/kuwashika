import * as React from "react";
import { View } from "react-native";
import { TEETH_ALL } from "../../../constants/Constant";
import TextInputSmallMolecular from "../../moleculars/TextInputSmallMolecular";
import { PpdContext } from "../../pages/PpdPage";

export type teethProps = {
  teethRows: number;
  teethIndex: number;
  moveFocus: (index: number) => void;
  textInputs: any[];
  setTextInputsRef: (index: number, ref: any) => void;
};

export const PPD_PARTS = [0, 1, 2];

/**
 * 横３マス
 * @returns
 */
export default function PpdOneSideTeeth(props: teethProps) {
  const ppdContext = React.useContext(PpdContext);
  // let textInputs: any[] = [ppdContext.textInputs];
  // let textInputs: any[] = [...ppdContext.textInputs];

  // React.useEffect(() => {
  //   let textInputs: any[] = [...ppdContext.textInputs];
  //   ppdContext.setTextInputs(textInputs);
  // }, []);

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
          onChangeText={() => props.moveFocus(indexInit + count)}
          // value={partsNum(props.teethRows, props.teethIndex, count).toString()}
          teethPartsIndex={indexInit + count}
          // autoFocus={indexInit + count === 0}
          // value={(indexInit + count).toString()}
          refInput={(ref: any) => (props.textInputs[indexInit + count] = ref)}
          // refInput={(ref: any) =>
          //   props.setTextInputsRef(indexInit + count, ref)
          // }
          // refInput={(ref: any) => (props.textInputs[indexInit + count] = ref)}
          // refInput={ppdContext.textInputs[indexInit + count]}
          // refInput={(ref: any) => (textInputs[0] = ref)}
          // refInput={(ref: any) =>
          //   (ppdContext.textInputs[indexInit + count] = ref)
          // }
          // refInput={(ref: any) =>
          //   ppdContext.setFocusRef(
          //     partsNum(props.teethRows, props.teethIndex, count),
          //     ref
          //   )
          // }
          // refInput={textInputs[index1]}
          blurOnSubmit={false}
        />
      ))}
    </View>
  );
}
