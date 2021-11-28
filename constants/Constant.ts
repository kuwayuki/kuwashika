import { TextInputProps } from "react-native";
import { DropdownType } from "../components/atoms/DropDownPickerAtom";

export const SETTING_FILE = "setting.json";
export const DATA_FILE = "_data.json";

/**
 * 歯の真ん中の数字部分
 */
export type teethType = {
  teethGroupIndex: number; // 歯の番号
  teethNum: number; // 歯の表示数値番号
  teethRow: number;
};

/**
 * 各種歯の状態
 */
export type teethPropsEx = {
  teethValue?: TEETH_TYPE; // 歯の状態
  mtTeethNums?: number[]; // 歯の欠損番号
  focusNumber?: number; // フォーカス歯の番号
  setFocusNumber?: (focusNumber?: number) => void;
};

/**
 * 各種歯ぐき
 */
export type teethGroupProps = TextInputProps & {
  teethGroupIndex?: number; // 歯のグループ番号
  mtTeethNums?: number[]; // 歯の欠損番号
  isHideNum?: boolean;
};

export type TextInputPropsEx = teethGroupProps & teethPropsEx;

export type TEETH_TYPE = {
  index: number; // 歯の番号：1~32 or 1~192
  value?: number; // 歯の入力数値
  teethRow: number; // 歯の列番号
  teethGroupIndex: number; // 歯のグループ番号
  status?: TEETH_STATUS_TYPE; // 歯の状態：1~32 or 1~192
};

export type TEETH_STATUS_TYPE = {
  isBleeding: boolean;
  isDrainage: boolean;
};

export enum TEETH_STATUS {
  NORMAL,
  MT,
  BLLEDING,
  DRAINAGE,
}

export const TEETH_ALL: teethType[] = [
  { teethGroupIndex: 0, teethNum: 8, teethRow: 0 },
  { teethGroupIndex: 1, teethNum: 7, teethRow: 0 },
  { teethGroupIndex: 2, teethNum: 6, teethRow: 0 },
  { teethGroupIndex: 3, teethNum: 5, teethRow: 0 },
  { teethGroupIndex: 4, teethNum: 4, teethRow: 0 },
  { teethGroupIndex: 5, teethNum: 3, teethRow: 0 },
  { teethGroupIndex: 6, teethNum: 2, teethRow: 0 },
  { teethGroupIndex: 7, teethNum: 1, teethRow: 0 },
  { teethGroupIndex: 8, teethNum: 1, teethRow: 0 },
  { teethGroupIndex: 9, teethNum: 2, teethRow: 0 },
  { teethGroupIndex: 10, teethNum: 3, teethRow: 0 },
  { teethGroupIndex: 11, teethNum: 4, teethRow: 0 },
  { teethGroupIndex: 12, teethNum: 5, teethRow: 0 },
  { teethGroupIndex: 13, teethNum: 6, teethRow: 0 },
  { teethGroupIndex: 14, teethNum: 7, teethRow: 0 },
  { teethGroupIndex: 15, teethNum: 8, teethRow: 0 },
  { teethGroupIndex: 16, teethNum: 8, teethRow: 1 },
  { teethGroupIndex: 17, teethNum: 7, teethRow: 1 },
  { teethGroupIndex: 18, teethNum: 6, teethRow: 1 },
  { teethGroupIndex: 19, teethNum: 5, teethRow: 1 },
  { teethGroupIndex: 20, teethNum: 4, teethRow: 1 },
  { teethGroupIndex: 21, teethNum: 3, teethRow: 1 },
  { teethGroupIndex: 22, teethNum: 2, teethRow: 1 },
  { teethGroupIndex: 23, teethNum: 1, teethRow: 1 },
  { teethGroupIndex: 24, teethNum: 1, teethRow: 1 },
  { teethGroupIndex: 25, teethNum: 2, teethRow: 1 },
  { teethGroupIndex: 26, teethNum: 3, teethRow: 1 },
  { teethGroupIndex: 27, teethNum: 4, teethRow: 1 },
  { teethGroupIndex: 28, teethNum: 5, teethRow: 1 },
  { teethGroupIndex: 29, teethNum: 6, teethRow: 1 },
  { teethGroupIndex: 30, teethNum: 7, teethRow: 1 },
  { teethGroupIndex: 31, teethNum: 8, teethRow: 1 },
];
export const TEETH_UP: teethType[] = [...TEETH_ALL].filter(
  (teeth) => teeth.teethRow === 0
);
export const TEETH_DOWN: teethType[] = [...TEETH_ALL].filter(
  (teeth) => teeth.teethRow === 1
);

export const INSPACTION_ITEMS: DropdownType[] = [
  { label: "Sc後", value: 1 },
  { label: "SRP後", value: 2 },
  { label: "SRP/P重防", value: 3 },
  { label: "任意入力", value: 10 },
];
