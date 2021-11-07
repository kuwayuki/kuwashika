import * as React from "react";
import { StatusBar, StyleSheet, Switch, View } from "react-native";
import { Icon } from "react-native-elements";
import DatePickerAtom from "../../atoms/DatePickerAtom";
import DropDownPickerAtom from "../../atoms/DropDownPickerAtom";
import TitleAndAction from "../../moleculars/TitleAndAction";

export default function CommonInfoInput() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(1);
  const [items, setItems] = React.useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]);
  const [exam, setExam] = React.useState([
    { label: "2021/11/06 初診", value: 1 },
  ]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
          // justifyContent: "space-between",
          height: "auto",
          display: "flex",
          width: "auto",
          flexDirection: "row",
          justifyContent: "flex-start",
          // justifyContent: "space-between",
        }}
      >
        <TitleAndAction title={"診療日"}>
          <DatePickerAtom />
        </TitleAndAction>
        <TitleAndAction title={"患者番号"}>
          <DropDownPickerAtom
            open={open}
            setOpen={setOpen}
            items={items}
            value={value}
            setValue={setValue}
            width={70}
          />
        </TitleAndAction>
        <TitleAndAction title={"検査データ"}>
          <DropDownPickerAtom
            open={open}
            setOpen={setOpen}
            items={exam}
            value={value}
            setValue={setValue}
            width={160}
            // style={{ maxWidth: 160 }}
          />
        </TitleAndAction>
        <TitleAndAction title={"基本"}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TitleAndAction>
      </View>
      <View style={{ flexGrow: 1 }}></View>
      <View
        style={{
          // height: "auto",
          // display: "flex",
          // width: "100%",
          flexDirection: "row",
          // padding: 5,
          justifyContent: "flex-end",
          // justifyContent: "space-between",
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
