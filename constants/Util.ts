import { TEETH_TYPE } from "./Constant";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { TEETH_MATH } from "../components/moleculars/TextInputTeethMolecular";
import {
  Dimensions,
  NativeScrollEvent,
  Platform,
  PlatformIOSStatic,
} from "react-native";

/**
 * Settingファイルに保存されているデータ
 */
export enum PPD_ORDER_UP {
  ko, // コの字
  z, // Zの字
}

export enum PPD_ORDER_DOWN {
  hako, // 匚の字（右下開始）
  ko_re, // 逆コの字（左下開始）
}

export type DataType = {
  setting: SettingType;
  persons: PersonNumberType[]; // 患者番号と患者名のみ
};
export type SettingType = {
  ppdOrderType: { up: PPD_ORDER_UP; down: PPD_ORDER_DOWN };
  isAutoMove: boolean;
  isPcrAutoMove: boolean;
};

/**
 * 患者番号と名称
 */
export type PersonNumberType = {
  patientNumber: number;
  patientName?: string;
};

/**
 * 各患者データ
 */
export type PersonType = PersonNumberType & {
  data: PersonDataType[];
  currentData?: PersonDataType;
};

export type PersonDataType = {
  date: Date;
  inspectionDataNumber: number;
  inspectionDataKindNumber: number;
  inspectionDataName: string;
  isPrecision: boolean;
  mtTeethNums: number[];
  PPD: {
    precision: TEETH_TYPE[];
    basic: TEETH_TYPE[];
  };
  UPSET: {
    basic: TEETH_TYPE[];
  };
  PCR: {
    precision: TEETH_TYPE[];
    basic: TEETH_TYPE[];
  };
};

const INIT_DATA = (isPresion = false) => {
  let temp: TEETH_TYPE[] = [];
  if (isPresion) {
    for (let i = 0; i < 192; i++) {
      temp.push({
        index: i,
        teethRow: Math.floor(i / 48),
        teethGroupIndex: Math.floor((i % 48) / 3 + (i < 192 / 2 ? 0 : 16)),
      } as TEETH_TYPE);
    }
  } else {
    for (let i = 0; i < 32; i++) {
      temp.push({
        index: i,
        teethRow: Math.floor(i / 16),
        teethGroupIndex: i,
      } as TEETH_TYPE);
    }
  }
  return temp;
};

export const INIT_PERSON: PersonDataType = {
  isPrecision: false,
  inspectionDataNumber: 1,
  inspectionDataKindNumber: 0,
  inspectionDataName: "初診",
  date: new Date(),
  mtTeethNums: [],
  PPD: {
    precision: INIT_DATA(true),
    basic: INIT_DATA(),
    // precision: [],
    // basic: [],
  },
  UPSET: {
    basic: INIT_DATA(),
  },
  PCR: {
    precision: [],
    basic: [],
  },
} as PersonDataType;

export const INIT_SETTING_DATA: DataType = {
  setting: {
    ppdOrderType: { up: PPD_ORDER_UP.ko, down: PPD_ORDER_DOWN.hako },
    isAutoMove: false,
    isPcrAutoMove: false,
  },
  // 患者ごとのデータ
  persons: [
    {
      patientNumber: 1,
      patientName: "患者名A",
    },
    {
      patientNumber: 9999,
      patientName: "サンプル",
    },
  ],
};

export const InitSettingData = () => {
  return INIT_SETTING_DATA;
};

export enum DateFormat {
  YY_MM_DD_dd = "YYYY/MM/DD(dd)",
  MM_DD_dd = "MM/DD(dd)",
  YY_MM_DD = "YYYY/MM/DD",
  MM_DD = "MM/DD",
}

export const formatDate = (date: Date, type: DateFormat): string => {
  switch (type) {
    case DateFormat.YY_MM_DD_dd:
      return dayjs(date).locale("ja").format("YYYY/MM/DD(dd)");
    case DateFormat.MM_DD_dd:
      return dayjs(date).locale("ja").format("MM/DD(dd)");
    case DateFormat.YY_MM_DD:
      return dayjs(date).locale("ja").format("YYYY/MM/DD");
    case DateFormat.MM_DD:
      return dayjs(date).locale("ja").format("MM/DD");
    default:
      return "";
  }
};

export const getScrollPosition = (
  nativeEvent: NativeScrollEvent,
  index?: number,
  isPrecision?: boolean
): any => {
  const zoomScale = nativeEvent.zoomScale ?? 1;
  const partsTimesX = isPrecision ? 3 : 1;
  const partsTimesY = isPrecision ? 4 : 2;
  const maxColumns = 16 * partsTimesX;
  const MAX_WIDTH = 48 * TEETH_MATH;

  // 左から何番目？
  let indexPositionX = Math.floor(index % maxColumns);
  if (indexPositionX > 0)
    indexPositionX = indexPositionX - (isPrecision ? 9 : 3);
  // 上から何番目？
  const indexPositionY = Math.floor(index / maxColumns);

  // 一マス分のサイズ
  const timesX = (MAX_WIDTH * zoomScale) / maxColumns;
  const bornusY = nativeEvent.layoutMeasurement.height * zoomScale;
  // 端っこに行くにつれて差分を徐々に倍率を下げる（真ん中が最大）
  const positionX =
    timesX * indexPositionX - (zoomScale >= 1 ? 300 : 100 * zoomScale);
  const positionY =
    (nativeEvent.contentSize.height / partsTimesY) * indexPositionY +
    (indexPositionY < partsTimesY / 2 ? -bornusY : bornusY);
  return { x: positionX, y: positionY };
};

// 塗りつぶした数 ÷ (全歯数 x 4面)
export const pcrCalculation = (
  teethValues: TEETH_TYPE[],
  mtTeethNums: number[]
) => {
  // 塗りつぶした数
  const filled = teethValues.filter(
    (teeth) => teeth.value === 1 && !mtTeethNums.includes(teeth.teethGroupIndex)
  );
  // 塗りつぶした数
  const calc =
    (filled.length / (teethValues.length - 4 * mtTeethNums.length)) * 100;
  return Math.round(calc * 10) / 10;
};

// 各数値 ÷ (全歯数 x 4面)
export const ppdCalculation = (
  teethValues: TEETH_TYPE[],
  mtTeethNums: number[],
  countNum: number[]
) => {
  const filled = teethValues.filter(
    (teeth) =>
      countNum.includes(teeth.value) &&
      !mtTeethNums.includes(teeth.teethGroupIndex)
  );
  const calc =
    (filled.length / (teethValues.length - mtTeethNums.length)) * 100;
  return Math.round(calc * 10) / 10;
};

export const isIpad = (): boolean => {
  if (Platform.OS === "ios") {
    const platformIOS = Platform as PlatformIOSStatic;
    return platformIOS.isPad;
  }
  return false;
};

export const isIphoneMini = (): boolean => {
  const windowWidth = Dimensions.get("window").width;
  return windowWidth < 750;
};

export const isAndroid = (): boolean => {
  return Platform.OS === "android";
};

export const isIos = (): boolean => {
  return Platform.OS === "ios";
};

export const getYMD = (date?: Date): string => {
  try {
    const dt = parseDate(date);
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth() + 1)).slice(-2);
    const d = ("00" + dt.getDate()).slice(-2);
    const result = y + "/" + m + "/" + d;
    return result;
  } catch (error) {
    return "";
  }
};

export const parseDate = (input: any) => {
  try {
    if (input.seconds) {
      return parseFirestoreTimestampToDate(input);
    }
    return new Date(input);
  } catch (error) {
    return input;
  }
};

export const parseFirestoreTimestampToDate = (input: {
  seconds: number;
  nanoseconds: number;
}) => {
  if (
    input &&
    typeof input.seconds === "number" &&
    typeof input.nanoseconds === "number"
  ) {
    // FirestoreのタイムスタンプをDateオブジェクトに変換
    return new Date(input.seconds * 1000 + input.nanoseconds / 1000000);
  } else {
    // 入力が期待する形式でない場合は変換せずにnullを返す
    return null;
  }
};
