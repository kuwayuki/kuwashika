import * as React from "react";
import { View } from "react-native";
import { TEETH_ALL } from "../../../constants/Constant";
import TextInputSmallMolecular from "../../moleculars/TextInputSmallMolecular";
import { PpdContext } from "../../pages/PpdPage";

export type teethProps = {
  textInput: any[];
  teethRows: number;
  teethIndex: number;
};

/**
 * 横３マス
 * @returns
 */
export default function PpdOneSideTeeth(props: teethProps) {
  const ppdContext = React.useContext(PpdContext);

  const moveFocus = (index: number) => {
    // if (ppdContext.focusNumber >= TEETH_ALL.length * 3 - 1) return;
    // ppdContext.setFocusNumber(ppdContext.focusNumber + 1);
    // textInput[ppdContext.focusNumber + 1].focus();
    props.textInput[index + 1].focus();
    ppdContext.setFocusNumber(index + 1);
  };

  const partsNum = (
    textRows: number = 0,
    teethIndex: number = 0,
    count: number
  ) => {
    return (TEETH_ALL.length * textRows + teethIndex) * 3 + count;
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TextInputSmallMolecular
        {...props}
        textInput={props.textInput}
        onTextInput={() =>
          moveFocus(partsNum(props.teethRows, props.teethIndex, 0))
        }
        teethPartsIndex={partsNum(props.teethRows, props.teethIndex, 0)}
        // value={partsNum(props.teethRows, props.teethIndex, 0).toString()}
        // value={partsNum(props.teethIndex, 0).toString()}
        value={ppdContext.focusNumber.toString()}
        refInput={(ref: any) =>
          (props.textInput[partsNum(props.teethRows, props.teethIndex, 0)] =
            ref)
        }
      />
      <TextInputSmallMolecular
        {...props}
        teethPartsIndex={partsNum(props.teethRows, props.teethIndex, 1)}
        // value={ppdContext.focusNumber.toString()}
        onTextInput={() =>
          moveFocus(partsNum(props.teethRows, props.teethIndex, 1))
        }
        refInput={(ref: any) =>
          (props.textInput[partsNum(props.teethRows, props.teethIndex, 1)] =
            ref)
        }
      />
      <TextInputSmallMolecular
        {...props}
        onTextInput={() =>
          moveFocus(partsNum(props.teethRows, props.teethIndex, 2))
        }
        teethPartsIndex={partsNum(props.teethRows, props.teethIndex, 2)}
        refInput={(ref: any) =>
          (props.textInput[partsNum(props.teethRows, props.teethIndex, 2)] =
            ref)
        }
      />
    </View>
  );
}
