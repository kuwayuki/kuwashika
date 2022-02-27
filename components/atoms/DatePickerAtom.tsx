import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { getYMD, isAndroid, parseDate } from "../../constants/Util";
import { View } from "../organisms/common/Themed";
import ButtonAtom from "./ButtonAtom";
import TextInputAtom from "./TextInputAtom";

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
    if (!selectedDate) return;
    props.setDate(parseDate(selectedDate));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      {isAndroid() && (
        <ButtonAtom
          style={{ backgroundColor: "silver", padding: 6 }}
          onPress={showDatepicker}
        >
          {getYMD(props.date)}
        </ButtonAtom>
      )}
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
