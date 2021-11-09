type teethType = {
  teethIndex: number; // 歯の番号
  teethNum: number; // 歯の表示数値番号
};
export type TEETH_TYPE = {
  status: TEETH_STATUS;
  value: number;
  display: string;
  color: string;
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

export enum PPD_ORDER {
  co_reco,
}

export const INIT_DATA = {
  setting: {
    ppdOrderType: PPD_ORDER.co_reco,
  },
  person: [
    {
      patientNumber: 1,
      patientName: "患者名",
      data: [
        {
          date: new Date(),
          dataNumber: 0,
          dataName: "初診",
          isPrecision: false,
          PPD: {
            precision: [],
            basic: [],
            mtTeethNums: [],
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
} as JsonDataType;

export type JsonDataType = {
  setting: {
    ppdOrderType: number;
  };
  person: [
    {
      patientNumber?: number;
      patientName?: string;
      data?: [
        {
          date?: Date;
          dataNumber?: number;
          dataName?: string;
          isPrecision?: boolean;
          PPD?: {
            precision: TEETH_TYPE[];
            basic: TEETH_TYPE[];
            mtTeethNums: number[];
          };
          UPSET: {
            basic: TEETH_TYPE[];
          };
          PCR: {
            basic: TEETH_TYPE[];
          };
        }
      ];
    }
  ];
};

export const InitJsonData = () => {
  return INIT_DATA;
};

// export const JsonInsert = (data: JsonDataType) => {
//   return json;
// };
