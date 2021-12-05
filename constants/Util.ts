import { TEETH_TYPE } from "./Constant";
import dayjs from "dayjs";
import "dayjs/locale/ja";

/**
 * Settingファイルに保存されているデータ
 */
export enum PPD_ORDER {
  co_reco,
}
export type DataType = {
  setting: SettingType;
  persons: PersonNumberType[]; // 患者番号と患者名のみ
};
export type SettingType = { ppdOrderType: PPD_ORDER };

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

export const INIT_PERSON: PersonDataType = {
  isPrecision: false,
  inspectionDataNumber: 1,
  inspectionDataKindNumber: 1,
  inspectionDataName: "初診",
  date: new Date(),
  mtTeethNums: [],
  PPD: {
    precision: [],
    basic: [],
  },
  UPSET: {
    basic: [],
  },
  PCR: {
    precision: [],
    basic: [],
  },
} as PersonDataType;

export const INIT_SETTING_DATA: DataType = {
  setting: {
    ppdOrderType: PPD_ORDER.co_reco,
  },
  // 患者ごとのデータ
  persons: [
    {
      patientNumber: 1,
      patientName: "患者名A",
    },
    {
      patientNumber: 2,
      patientName: "患者名B",
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
