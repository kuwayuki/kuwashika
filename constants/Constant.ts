import { TextInputProps } from "react-native";

type teethType = {
  teethIndex: number; // 歯の番号
  teethNum: number; // 歯の表示数値番号
};

export type teethPropsEx = {
  teethValue?: TEETH_TYPE; // 歯の状態
  mtTeethNums?: number[]; // 歯の欠損番号
  focusNumber?: number; // フォーカス歯の番号
  setFocusNumber?: (focusNumber?: number) => void;
};

export type teethGroupProps = TextInputProps & {
  teethGroupIndex: number; // 歯のグループ番号
};

export type TextInputPropsEx = TextInputProps &
  teethPropsEx & {
    // isFocus?: boolean;
    // isUp?: boolean;
    // children?: React.ReactNode;
  };

export type TEETH_TYPE = {
  index: number; // 歯の番号：1~32 or 1~192
  status: TEETH_STATUS; // 歯の状態：1~32 or 1~192
  value?: number; // 歯の入力数値
  // display: string;
  // color: string;
};

export enum TEETH_STATUS {
  NORMAL,
  MT,
  BLLEDING,
  DRAINAGE,
}

export const TEETH_ALL: teethType[] = [
  { teethIndex: 0, teethNum: 8 },
  { teethIndex: 1, teethNum: 7 },
  { teethIndex: 2, teethNum: 6 },
  { teethIndex: 3, teethNum: 5 },
  { teethIndex: 4, teethNum: 4 },
  { teethIndex: 5, teethNum: 3 },
  { teethIndex: 6, teethNum: 2 },
  { teethIndex: 7, teethNum: 1 },
  { teethIndex: 8, teethNum: 1 },
  { teethIndex: 9, teethNum: 2 },
  { teethIndex: 10, teethNum: 3 },
  { teethIndex: 11, teethNum: 4 },
  { teethIndex: 12, teethNum: 5 },
  { teethIndex: 13, teethNum: 6 },
  { teethIndex: 14, teethNum: 7 },
  { teethIndex: 15, teethNum: 8 },
];
