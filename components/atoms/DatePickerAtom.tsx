import * as React from "react";
import { Platform, StyleSheet, TextProps } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePickerAtom(props: TextProps) {
  const [date, setDate] = React.useState(new Date());
  // const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <DateTimePicker
      style={styles.base}
      testID="dateTimePicker"
      value={date}
      mode={"date"}
      is24Hour={true}
      display="default"
      onChange={onChange}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    width: 120,
    marginVertical: 8,
  },
});
