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
