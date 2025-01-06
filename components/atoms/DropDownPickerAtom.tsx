import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";
import { AppContextState } from "../../App";
import { isIpad } from "../../constants/Util";
import { i18n } from "../locales/i18n";

export type DropdownType = { label: string; value: number; kind?: number };

type DropDownPickerAtomProps = Omit<DropDownPickerProps, "open" | "setOpen"> & {
  width?: number;
};
export default function DropDownPickerAtom(props: DropDownPickerAtomProps) {
  const [open, setOpen] = useState(false);
  const appContext = useContext(AppContextState);

  useEffect(() => {
    setOpen(false);
  }, [appContext.currentPerson]);

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
        dropDownContainerStyle={
          props.width !== undefined
            ? [
                styles.picker,
                { maxWidth: props.width, maxHeight: isIpad() ? 400 : 200 },
              ]
            : styles.picker
        }
        searchPlaceholder={i18n.t("dropdown.search_placeholder")}
        placeholder={i18n.t("dropdown.placeholder")}
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
        searchable={true}
        open={open}
        setOpen={setOpen}
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  picker: {
    fontSize: 14,
    minWidth: 80,
    maxWidth: 80,
    display: "flex",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "whitesmoke",
    minHeight: 36,
  },
  dropDown: {
    fontSize: 14,
    width: 160,
    alignSelf: "flex-end",
  },
});
