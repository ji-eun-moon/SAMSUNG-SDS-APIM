export interface IChartParams {
  apiId: number;
  teamName: string;
}

export interface IApiUsage {
  date: string;
  count: number;
}

export type TApiUsageList = IApiUsage[];

export interface IResponseTime {
  responseCode: number;
  responseTime: number;
  date: string;
}

export type TResponseTimeList = IResponseTime[];

export interface IResponseCode {
  responseCode: number;
  count: number;
}

export type TResponseCodeList = IResponseCode[];
