import DateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";

export type DateProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export default function DatePickerAtom(props: DateProps) {
  const [show, setShow] = React.useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || props.date;
    setShow(Platform.OS === "ios");
    props.setDate(currentDate);
  };

  // parse a date in yyyy-mm-dd format
  function parseDate(input) {
    try {
      var parts = input.match(/(\d+)/g);
      return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    } catch (error) {
      return input;
    }
  }

  return (
    <DateTimePicker
      locale={"ja"}
      style={styles.base}
      removeClippedSubviews={true}
      value={parseDate(props.date)}
      mode={"date"}
      display="compact"
      onChange={onChange}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    width: 110,
    marginVertical: 8,
  },
});
