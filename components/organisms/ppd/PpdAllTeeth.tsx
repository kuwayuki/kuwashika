import * as React from "react";
import { View } from "react-native";
import { TEETH_ALL } from "../../../constants/Constant";
import { PpdContext } from "../../pages/PpdPage";
import CommonOneBlockTeeth from "../common/CommonOneBlockTeeth";
import PpdOneBlockTeeth from "./PpdOneBlockTeeth";

export default function PpdAllTeeth() {
  const [text, onChangeText] = React.useState([]);
  let textInput: any[200] = [];
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
          <CommonOneBlockTeeth value={teeth.teethNum.toString()} isUp={true}>
            <PpdOneBlockTeeth
              teethRows={0}
              teethIndex={teeth.teethIndex}
              textInput={textInput}
            />
          </CommonOneBlockTeeth>
          <CommonOneBlockTeeth value={teeth.teethNum.toString()} isUp={false}>
            <PpdOneBlockTeeth
              teethRows={1}
              teethIndex={teeth.teethIndex}
              textInput={textInput}
            />
          </CommonOneBlockTeeth>
        </View>
      ))}
    </View>
  );
}
