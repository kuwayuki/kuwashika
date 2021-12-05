import DateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";

export type DateProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export default function DatePickerAtom(props: DateProps) {
  const [show, setShow] = React.useState(false);

  /**
   * データが変更される度に編集データを更新
   */
  React.useEffect(() => {
    setShow(false);
  }, [props.date]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || props.date;
    setShow(Platform.OS === "ios");
    props.setDate(currentDate);
  };

  function parseDate(input) {
    try {
      return new Date(input);
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
