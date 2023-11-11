export interface IChartParams {
  apiId: number;
  teamName: string;
  type: 'use' | 'provide';
}

export interface ICategoryChartParams {
  categoryId: number;
  teamName: string;
  type: 'use' | 'provide';
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

export interface IApiCount {
  apiId: number;
  title: string;
  count: number;
}

export interface ICategoryUsage {
  date: string;
  countList: IApiCount[];
}

export type TCategoryUsageList = ICategoryUsage[];

export interface IFormattedChartData {
  name: string;
  data: number[];
  color: string;
}

export interface ICategoryResponseCode {
  responseCode: string;
  count: number;
  countList: IApiCount[];
}

export type TCategoryResponseCodeList = ICategoryResponseCode[];
