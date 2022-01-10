import { Alert } from "react-native";

export default function AlertAtom(
  title: string,
  message?: string,
  onClickOK?: () => void
  // buttons?: AlertButton[],
  // options?: AlertOptions
) {
  return Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: onClickOK,
        style: "default",
      },
    ],
    {
      cancelable: true,
    }
  );
}
