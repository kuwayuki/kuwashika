import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { AppContext } from "../../../App";
import { PersonCurrentType } from "../../../constants/Util";
import DatePickerAtom from "../../atoms/DatePickerAtom";
import DropDownPickerAtom from "../../atoms/DropDownPickerAtom";
import SwitchAtom from "../../atoms/SwitchAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";
import CommonPrintIcon from "./CommonPrintIcon";

export default function CommonInfoInput() {
  const appContext = React.useContext(AppContext);

  /**
   * データが変更される度に編集データを更新
   */
  React.useEffect(() => {
    appContext.setCurrentPerson({
      ...appContext.currentPerson,
      data: {
        ...appContext.currentPerson.data,
        date: appContext.inspectionDate,
        isPrecision: appContext.isPrecision,
        mtTeethNums: appContext.mtTeethNums,
      },
    } as PersonCurrentType);
  }, [
    appContext.inspectionDate,
    appContext.isPrecision,
    appContext.mtTeethNums,
  ]);

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
          <DatePickerAtom
            date={appContext.inspectionDate}
            setDate={appContext.setInspectionDate}
          />
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
        <CommonPrintIcon />
        <Icon
          raised
          name="cog"
          type="font-awesome"
          color="#999999"
          onPress={() => appContext.setRegistDatabase(appContext.currentPerson)}
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
