import * as React from "react";
import { View } from "react-native";
import { TEETH_ALL } from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import PpdOneBlockTeeth from "./PpdOneBlockTeeth";
import { PPD_PARTS } from "./PpdOneSideTeeth";

export default function PpdAllTeeth() {
  const [text, onChangeText] = React.useState([]);
  const [textInputs, setTextInputs] = React.useState<any[]>([]);
  // let textInputs: any[] = Array(200).fill(React.createRef());
  // const inputRefs = Array(4).fill(React.createRef());

  const WARP = TEETH_ALL.length * PPD_PARTS.length;
  const LAST_ROWS = [WARP - 1, WARP * 2 - 1, WARP * 3 - 1, WARP * 4 - 1]; // 47, 95, 143, 191
  const WARP_ROWS = [WARP - 1, WARP, WARP * 3, WARP * 3 - 1]; // 47, 48, 144, 143
  const moveFocus = (index: number) => {
    // 第一指定：上「コ」⇒下「逆コ」
    // 上：[0 ～ ★47] ⇒ [95 ～ ★48] ⇒ 下：[191 ～ ★144] ⇒ [96 ～ ★143]
    if (WARP_ROWS.includes(index)) {
      // WARP_ROWSの場合は所定の場所にワープ
      const indexNum = WARP_ROWS.indexOf(index);
      switch (indexNum) {
        case 0:
          // 95へ移動
          textInputs[LAST_ROWS[1]].focus();
          break;
        case 1:
          // 191へ移動
          textInputs[LAST_ROWS[3]].focus();
          break;
        case 2:
          // 96へ移動
          textInputs[LAST_ROWS[1] + 1].focus();
          break;
        case 3:
          // 0へ移動
          textInputs[0].focus();
          break;
      }
    } else if (index <= LAST_ROWS[0]) {
      textInputs[index + 1].focus();
    } else if (index <= LAST_ROWS[1]) {
      textInputs[index - 1].focus();
    } else if (index <= LAST_ROWS[2]) {
      textInputs[index + 1].focus();
    } else if (index <= LAST_ROWS[3]) {
      textInputs[index - 1].focus();
    }
  };
  const setTextInputsRef = (index: number, ref: any) => {
    setTextInputs(() => {
      const temp = [...textInputs, (textInputs[index] = ref)];
      return [...temp];
    });
  };

  const onChange = () => {
    onChangeText({ ...text });
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {TEETH_ALL.map((teeth) => (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PpdOneBlockTeeth
            teethRows={0}
            teethIndex={teeth.teethIndex}
            moveFocus={moveFocus}
            textInputs={textInputs}
            setTextInputsRef={setTextInputsRef}
          />
          <TextReadMolecular value={teeth.teethNum.toString()} />
          <TextReadMolecular value={teeth.teethNum.toString()} />
          <PpdOneBlockTeeth
            teethRows={1}
            teethIndex={teeth.teethIndex}
            moveFocus={moveFocus}
            textInputs={textInputs}
            setTextInputsRef={setTextInputsRef}
          />
        </View>
      ))}
    </View>
  );
}
