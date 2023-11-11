export interface IApi {
  apiName: string;
  apiAddress: string;
  apiId: number;
}

export type IApiNameList = IApi[];

export interface ICategory {
  categoryName: string;
  categoryId: number;
  description: string;
  apiList: IApiNameList;
}

export type TCategoryList = ICategory[];

export interface IApiDetail {
  apiId: number;
  title: string;
  content: string;
  method: 'GET' | 'POST';
  endpoint: string;
  input: string;
  output: string;
  outputExample: string;
  categoryId: number;
}

export interface IApiInput {
  name: string;
  description: string;
  example: string;
  type: string;
  required: string;
}

export type TApiInputList = IApiInput[];

export interface IApiOutput {
  name: string;
  description: string;
  example: string;
  type: string;
}

export type TApiOutputList = IApiOutput[];

export interface IApiTestInfo {
  apiId: number;
  title: string;
  method: 'GET' | 'POST';
  endpoint: string;
  input: string;
  outputExample: string;
  categoryToken: string;
}

export interface ITestResult {
  response: string;
  result: string;
}

export interface IApiSearch {
  apiId: number;
  apiName: string;
  apiAddress: string;
  categoryId: number;
  categoryName: string;
}

export type TApiSearchList = IApiSearch[];

export interface IApiStatus {
  apiId: number;
  apiName: string;
  categoryId: number;
  categoryName: string;
  responseTime: number;
  updatedAt: Date;
  apiAddress: string;
  apiStatus: '정상' | '점검' | '오류';
}

export type IApiStatusList = IApiStatus[];

export interface IApiStatusInfo {
  content: IApiStatusList;
  totalPages: number;
}

export interface Pageable {
  status: string;
  page: number;
  size: number;
}

export interface StatusPageable extends Pageable {
  apiName: string;
}

export interface IApiName {
  apiName: string;
  categoryId: number;
}

export interface ICategoryName {
  categoryName: string;
}
