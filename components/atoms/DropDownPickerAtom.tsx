import * as React from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";

type DropDownPickerAtom = DropDownPickerProps & {
  width?: number;
};
export default function DropDownPickerAtom(props: DropDownPickerAtom) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // paddingRight: 16,
        // maxWidth: 200,
      }}
    >
      <DropDownPicker
        style={
          props.width !== undefined
            ? [styles.picker, { maxWidth: props.width }]
            : styles.picker
        }
        containerStyle={
          props.width !== undefined
            ? [styles.picker, { maxWidth: props.width }]
            : styles.picker
        }
        // labelStyle={styles.picker}
        // placeholderStyle={styles.picker}
        // dropDownContainerStyle={styles.picker}
        // tickIconStyle={styles.picker}
        // closeIconStyle={styles.picker}
        // modalContentContainerStyle={styles.picker}
        // listItemContainerStyle={styles.picker}
        // listItemLabelStyle={styles.picker}
        // listChildContainerStyle={styles.picker}
        // listChildLabelStyle={styles.picker}
        // listParentContainerStyle={styles.picker}
        // listParentLabelStyle={styles.picker}
        // selectedItemContainerStyle={styles.picker}
        // selectedItemLabelStyle={styles.picker}
        // customItemContainerStyle={styles.picker}
        // customItemLabelStyle={styles.picker}
        // listMessageContainerStyle={styles.picker}
        // listMessageTextStyle={styles.picker}
        // itemSeparatorStyle={styles.picker}
        // badgeSeparatorStyle={styles.picker}
        listMode="SCROLLVIEW"
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  picker: {
    height: 37,
    fontSize: 14,
    maxWidth: 80,
  },
});