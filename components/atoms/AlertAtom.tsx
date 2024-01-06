import { Alert } from "react-native";

export default function AlertAtom(
  title: string,
  message?: string,
  onClickOK?: () => void,
  onClickCancel?: () => void,
  OKName?: string,
  CancelName?: string
  // buttons?: AlertButton[],
  // options?: AlertOptions
) {
  return Alert.alert(
    title,
    message,
    [
      {
        text: CancelName ?? "Cancel",
        style: "cancel",
        onPress: onClickCancel,
      },
      {
        text: OKName ?? "OK",
        onPress: onClickOK,
        style: "default",
      },
    ],
    {
      cancelable: true,
    }
  );
}
