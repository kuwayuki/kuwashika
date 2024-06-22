import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { isAndroid, parseDate } from "../../constants/Util";
import { View } from "../organisms/common/Themed";

export type DateProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export default function DatePickerAtom(props: DateProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
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
