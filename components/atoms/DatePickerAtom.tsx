import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";
import { StyleSheet } from "react-native";
import { getYMD, isAndroid, parseDate } from "../../constants/Util";
import { View } from "../organisms/common/Themed";
import ButtonAtom from "./ButtonAtom";

export type DateProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export default function DatePickerAtom(props: DateProps) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(false);
  }, [props.date]);

  const onChange = (event: any, selectedDate: Date) => {
    setShow(false);
    if (!selectedDate) return;
    props.setDate(parseDate(selectedDate));
  };

  return (
    <View>
      {(show || !isAndroid()) && (
        <RNDateTimePicker
          locale={"ja"}
          style={styles.base}
          removeClippedSubviews={true}
          value={parseDate(props.date)}
          mode={"date"}
          display={isAndroid() ? "default" : "compact"}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 110,
    marginVertical: 8,
  },
});
