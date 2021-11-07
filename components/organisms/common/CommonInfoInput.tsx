import * as React from "react";
import { StatusBar, StyleSheet, Switch, View } from "react-native";
import { Icon } from "react-native-elements";
import { AppContext } from "../../../App";
import DatePickerAtom from "../../atoms/DatePickerAtom";
import DropDownPickerAtom from "../../atoms/DropDownPickerAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";
import SwitchAtom from "../../atoms/SwitchAtom";

export default function CommonInfoInput() {
  const appContext = React.useContext(AppContext);

  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: "row",
        zIndex: 1000,
      }}
    >
      <View
        style={{
          height: "auto",
          display: "flex",
          width: "auto",
          flexDirection: "row",
          justifyContent: "flex-start",
          // justifyContent: "space-between",
        }}
      >
        <TitleAndAction title={"検査日"}>
          <DatePickerAtom />
        </TitleAndAction>
        <TitleAndAction title={"患者番号"}>
          <DropDownPickerAtom
            items={appContext.patients}
            value={appContext.patientNumber}
            setValue={appContext.setPatientNumber}
            width={80}
          />
        </TitleAndAction>
        <TitleAndAction title={"検査データ"}>
          <DropDownPickerAtom
            items={appContext.inspectionData}
            value={appContext.inspectionDataNumber}
            setValue={appContext.setInspectionDataNumber}
            width={160}
          />
        </TitleAndAction>
        <TitleAndAction title={appContext.isPrecision ? "精密" : "基本"}>
          <SwitchAtom
            onValueChange={() =>
              appContext.setPrecision(!appContext.isPrecision)
            }
            value={appContext.isPrecision}
          />
        </TitleAndAction>
      </View>
      <View style={{ flexGrow: 1 }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          zIndex: 1000,
        }}
      >
        <Icon
          raised
          name="print"
          type="font-awesome"
          color="#3399FF"
          onPress={() => console.log("hello")}
        />
        <Icon
          raised
          name="cog"
          type="font-awesome"
          color="#999999"
          onPress={() => console.log("hello")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
});
