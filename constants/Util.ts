import { TEETH_TYPE } from "./Constant";
import dayjs from "dayjs";
import "dayjs/locale/ja";

export enum PPD_ORDER {
  co_reco,
}

export type DataType = {
  setting: SettingType;
  persons: PersonType[];
};

export type SettingType = { ppdOrderType: PPD_ORDER };

export type PersonType = {
  patientNumber: number;
  patientName?: string;
  data: PersonDataType[];
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
    basic: TEETH_TYPE[];
  };
};

export type PersonCurrentType = {
  patientNumber: number;
  data: PersonDataType;
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
    basic: [],
  },
} as PersonDataType;

export const INIT_DATA: DataType = {
  setting: {
    ppdOrderType: PPD_ORDER.co_reco,
  },
  // 患者ごとのデータ
  persons: [
    {
      patientNumber: 1,
      patientName: "患者名A",
      data: [
        {
          date: new Date(),
          inspectionDataNumber: 1,
          inspectionDataKindNumber: 1,
          inspectionDataName: "初診",
          isPrecision: false,
          mtTeethNums: [6, 8],
          PPD: {
            precision: [
              {
                index: 0,
                teethRow: 0,
                teethGroupIndex: 0,
                value: 6,
                status: { isBleeding: true, isDrainage: true },
              } as TEETH_TYPE,
            ],
            basic: [
              {
                index: 0,
                teethRow: 0,
                teethGroupIndex: 0,
                value: 3,
                status: { isBleeding: true, isDrainage: false },
              } as TEETH_TYPE,
            ],
          },
          UPSET: {
            basic: [],
          },
          PCR: {
            basic: [],
          },
        },
      ],
    },
    {
      patientNumber: 2,
      patientName: "患者名B",
      data: [
        {
          date: new Date(2018, 9, 26, 1, 1, 22),
          inspectionDataNumber: 1,
          inspectionDataKindNumber: 1,
          inspectionDataName: "初診",
          isPrecision: false,
          mtTeethNums: [],
          PPD: {
            precision: [],
            basic: [],
          },
          UPSET: {
            basic: [],
          },
          PCR: {
            basic: [],
          },
        },
        {
          // date: new Date(),
          date: new Date(2019, 9, 26, 1, 1, 22),
          inspectionDataNumber: 2,
          inspectionDataKindNumber: 2,
          inspectionDataName: "2回目",
          isPrecision: true,
          mtTeethNums: [],
          PPD: {
            precision: [],
            basic: [],
          },
          UPSET: {
            basic: [],
          },
          PCR: {
            basic: [],
          },
        },
      ],
    },
    {
      patientNumber: 3,
      patientName: "患者名",
      data: [
        {
          date: new Date(2020, 9, 26, 1, 1, 22),
          inspectionDataNumber: 1,
          inspectionDataKindNumber: 1,
          inspectionDataName: "初診",
          isPrecision: false,
          mtTeethNums: [],
          PPD: {
            precision: [],
            basic: [],
          },
          UPSET: {
            basic: [],
          },
          PCR: {
            basic: [],
          },
        },
      ],
    },
  ],
};

export const InitJsonData = () => {
  return INIT_DATA;
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
