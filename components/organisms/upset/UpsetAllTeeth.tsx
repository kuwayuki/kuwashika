import { useContext } from "react";
import { View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import { TEETH_DOWN, TEETH_UP, teethType } from "../../../constants/Constant";
import TextReadMolecular from "../../moleculars/TextReadMolecular";
import { UpsetContextDispatch, UpsetContextState } from "../../pages/UpsetPage";
import UpsetOneBlockTeeth from "./UpsetOneBlockTeeth";

export default function UpsetAllTeeth() {
  const appContextState = useContext(AppContextState);
  const appContextDispatch = useContext(AppContextDispatch);

  const upsetContextState = useContext(UpsetContextState);
  const upsetContextDispatch = useContext(UpsetContextDispatch);

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
      <UpsetOneBlockTeeth
        teethValues={upsetContextState.teethValuesSimple}
        setTeethValue={upsetContextDispatch.setTeethValue}
        teethRows={teeth.teethRow}
        teethGroupIndex={teeth.teethGroupIndex}
        focusNumber={upsetContextState.focusNumber}
        setFocusNumber={upsetContextDispatch.setFocusNumber}
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
