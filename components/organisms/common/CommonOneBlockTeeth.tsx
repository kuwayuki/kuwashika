import * as React from "react";
import { TextInputProps } from "react-native";
import TextReadMolecular from "../../moleculars/TextReadMolecular";

export type teethPropsEx = {
  // refInput?: any;
  teethIndex?: number; // 歯の番号
  teethPartsIndex?: number; // 歯の分裂番号
  mtTeethNums?: number[]; // 歯の番号
  focusNumber?: number;
  setFocusNumber?: (focusNumber?: number) => void;
};
export type TextInputPropsEx = TextInputProps &
  teethPropsEx & {
    // isFocus?: boolean;
    isUp?: boolean;
    children?: React.ReactNode;
  };

export default function CommonOneBlockTeeth(props: TextInputPropsEx) {
  return (
    <>
      {props.isUp && props.children}
      <TextReadMolecular {...props} />
      {!props.isUp && props.children}
    </>
  );
}
