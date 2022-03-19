import * as React from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import { AppContextState } from "../../App";

export type DropdownType = { label: string; value: number; kind?: number };

type DropDownPickerAtomProps = PickerSelectProps & {
  width?: number;
};
export default function DropDownPickerAndroidAtom(
  props: DropDownPickerAtomProps
) {
  const [open, setOpen] = React.useState(false);
  const appContext = React.useContext(AppContextState);

  React.useEffect(() => {
    setOpen(false);
  }, [appContext.currentPerson]);

  const onValueChange = (value: any, index: number) => {
    if (index == null) return;
    props.onValueChange(value, index);
  };

  return (
    <View
      style={{
        display: "flex",
        // flexDirection: "row",
        alignItems: "center",
        paddingRight: 8,
        paddingLeft: 4,
        // minWidth: 200,
      }}
    >
      <RNPickerSelect {...props} onValueChange={onValueChange} />
    </View>
  );
}
const styles = StyleSheet.create({
  picker: {
    height: 37,
    fontSize: 14,
    minWidth: 80,
    maxWidth: 80,
    display: "flex",
    // overflow: "hidden",
    // flexDirection: "row",
  },
  dropDown: {
    fontSize: 14,
    width: 160,
    // textAlign: "right",
    alignSelf: "flex-end",
  },
});
