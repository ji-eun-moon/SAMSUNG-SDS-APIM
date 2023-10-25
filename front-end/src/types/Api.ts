export interface ICategory {
  categoryName: string;
  categoryId: number;
  description: string;
}

export type TCategoryList = ICategory[];

export interface IApi {
  apiName: string;
  apiAddress: string;
  apiId: number;
}

export type IApiNameList = IApi[];

export interface IApiDetail {
  apiId: number;
  title: string;
  content: string;
  avaliableCheck: boolean; // 사용중이면 true
  method: 'GET' | 'POST';
  endpoint: string;
  input: string;
  inputExample: string;
  output: string;
  outputExample: string;
}

export interface IApiTest {
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
  categoryId: number;
  categoryName: string;
}

export type IApiSearchList = IApiSearch[];

interface IApiStatus {
  apiId: number;
  apiName: string;
  categoryId: number;
  categoryName: string;
  responseTime: number;
  updatedAt: Date;
  apiStatus: '정상' | '점검' | '오류';
}

export type IApiStatusList = IApiStatus[];
