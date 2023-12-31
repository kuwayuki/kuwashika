import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { AppContextDispatch, AppContextState } from "../../../App";
import { TAB_PAGE } from "../../../constants/Constant";
import {
  isAndroid,
  isIpad,
  isIphoneMini,
  PersonDataType,
} from "../../../constants/Util";
import DatePickerAtom from "../../atoms/DatePickerAtom";
import DropDownPickerAtom from "../../atoms/DropDownPickerAtom";
import SwitchAtom from "../../atoms/SwitchAtom";
import TextInputAtom from "../../atoms/TextInputAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";
import CommonPrintIcon from "./CommonPrintIcon";

type CommonInfoInputPropsType = {
  tabPage: TAB_PAGE;
};

export default function CommonInfoInput(props: CommonInfoInputPropsType) {
  const appContextState = React.useContext(AppContextState);
  const appContextDispatch = React.useContext(AppContextDispatch);

  /**
   * データが変更される度に編集データを更新
   */
  React.useEffect(() => {
    if (!appContextState.currentPerson) return;
    const currentData = appContextState.currentPerson.currentData;
    if (
      currentData.isPrecision === appContextState.isPrecision &&
      currentData.date === appContextState.inspectionDate &&
      currentData.mtTeethNums === appContextState.mtTeethNums
    )
      return;

    const data: PersonDataType = {
      ...appContextState.currentPerson.currentData,
      date: appContextState.inspectionDate,
      isPrecision: appContextState.isPrecision,
      mtTeethNums: appContextState.mtTeethNums,
    };
    appContextDispatch.setCurrentPersonData(data);
  }, [
    appContextState.inspectionDate,
    appContextState.isPrecision,
    appContextState.mtTeethNums,
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
        <TitleAndAction title={""}>
          <DatePickerAtom
            date={appContextState.inspectionDate}
            setDate={appContextDispatch.setInspectionDate}
          />
        </TitleAndAction>
        <TitleAndAction title={isIphoneMini() ? "" : "患者"}>
          <DropDownPickerAtom
            items={appContextState.patients}
            value={appContextState.patientNumber}
            setValue={appContextDispatch.setPatientNumber}
            width={isIpad() ? 180 : isIphoneMini() ? 120 : 150}
          />
        </TitleAndAction>
        <TitleAndAction title={isIphoneMini() ? "" : "データ"}>
          <DropDownPickerAtom
            items={appContextState.inspectionData}
            value={appContextState.inspectionDataNumber}
            setValue={appContextDispatch.setInspectionDataNumber}
            width={isIpad() ? 180 : isIphoneMini() ? 160 : 160}
          />
        </TitleAndAction>
        <TitleAndAction
          title={appContextState.isPrecision ? "精密" : "基本"}
          style={props.tabPage && { display: "none" }}
        >
          <SwitchAtom
            onValueChange={() =>
              appContextDispatch.setPrecision(!appContextState.isPrecision)
            }
            value={appContextState.isPrecision}
          />
        </TitleAndAction>
      </View>
      <View style={{ flexGrow: 1 }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <CommonPrintIcon />
        <Icon
          raised
          name="cog"
          type="font-awesome"
          color="#999999"
          onPress={() => appContextDispatch.setModalNumber(100)}
          containerStyle={{ margin: 0, padding: 0 }}
          // onPress={() => appContext.setRegistDatabase(undefined)}
          // onPress={() => appContext.setRegistDatabase(appContext.currentPerson)}
        />
      </View>
    </View>
  );
}
