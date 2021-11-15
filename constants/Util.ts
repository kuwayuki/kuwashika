import { TEETH_TYPE } from "./Constant";

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
  dataNumber: number;
  dataName: string;
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
          dataNumber: 1,
          dataName: "初診",
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
          dataNumber: 1,
          dataName: "初診",
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
          dataNumber: 2,
          dataName: "2021/11/11 2回目",
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
          dataNumber: 1,
          dataName: "初診",
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

// export const JsonInsert = (data: JsonDataType) => {
//   return json;
// };
