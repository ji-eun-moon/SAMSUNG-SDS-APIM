import { ScatterDataItem } from '@/types/props/ChartProps';
import {
  TApiUsageList,
  TResponseCodeList,
  TResponseTimeList,
  TCategoryUsageList,
  IFormattedChartData,
  TCategoryResponseCodeList,
  ICategoryResponseCode,
  TCategoryResponseTimeList,
} from '../types/Statistics';

// 사용량 데이터 차트에 사용할 수 있도록 바꾸기
export const usageData = (data: TApiUsageList) => {
  const xValues = data.map((item) => item.date);
  const yValues = data.map((item) => item.count);

  return { xValues, yValues };
};

// 응답 시간 차트에 사용할 수 있도록 바꾸기
export const responseData = (data: TResponseTimeList) => {
  const xValues = data.map((item) => item.date);
  const yValues = data.map((item) => item.responseTime);
  const responseCodeList = data.map((item) => item.responseCode);

  return { xValues, yValues, responseCodeList };
};

// 응답 코드 차트에 사용할 수 있도록 바꾸기 - 파이 차트
export const transformResponseCodeData = (data: TResponseCodeList) =>
  data.map((item) => ({
    value: item.count,
    name: item.responseCode.toString(),
  }));

// 응답 코드 차트에 사용할 수 있도록 바꾸기 - 막대 차트
export const barResponseCode = (data: TResponseCodeList) => {
  const xValues = data.map((item) => item.responseCode.toString());
  const yValues = data.map((item) => item.count);

  return { xValues, yValues };
};

// 카테고리 월 총 사용량 차트에 사용할 수 있도록 바꾸기
export const donutCategoryUsage = (data: TCategoryUsageList) => {
  const chartData = data[0].countList?.map((apiCount) => ({
    value: apiCount.count,
    name: apiCount.title,
  }));

  return chartData;
};

// 카테고리 월별/일별/시간별 사용량
export const formatCategoryChartData = (
  data: TCategoryUsageList,
): { chartDataTime: string[]; formattedChartData: IFormattedChartData[] } => {
  const apiDataMap: { [apiId: number]: IFormattedChartData } = {};
  const chartDataTime: string[] = [];

  const colors = ['#f19365', '#adbd6f', '#6783e5', '#7dcdff', '#e3999e', '#b4b0a3', '#72b6c6', '#ebd065', '#f1d7a9'];

  let colorIndex = 0;

  data.forEach((categoryUsage) => {
    chartDataTime.push(categoryUsage.date);

    categoryUsage.countList.forEach((apiCount) => {
      if (!apiDataMap[apiCount.apiId]) {
        apiDataMap[apiCount.apiId] = {
          name: apiCount.title,
          data: [],
          color: colors[colorIndex % colors.length],
        };
        colorIndex = (colorIndex + 1) % colors.length; // 증가 연산 대신 이 방식 사용
      }
      apiDataMap[apiCount.apiId].data.push(apiCount.count);
    });
  });

  const formattedChartData = Object.values(apiDataMap);
  return { chartDataTime, formattedChartData };
};

export const formatCategoryPieChartData = (data: TCategoryResponseCodeList) =>
  data.map((item: ICategoryResponseCode) => ({
    name: item.responseCode,
    value: item.count,
    countList: item.countList,
  }));

export const formatScatterChartData = (data: TCategoryResponseTimeList): ScatterDataItem[] => {
  // 시간대 별로 그룹화하는 함수
  const groupByHour = (dateString: string) => {
    const timePart = dateString.split('T')[1];
    if (!timePart) {
      return 'Unknown';
    }
    const parts = timePart.split(':');
    if (parts.length < 2) {
      return 'Unknown';
    }
    const hour = parts[0];
    const minute = parts[1];
    const second = parts[2].substring(0, 2);
    return `${hour}:${minute}:${second}`;
  };

  const scatterData = data.map((api) => ({
    name: api.apiTitle,
    type: 'scatter',
    symbolSize: 8,
    data: api.responseTimeResponses.map((response) => ({
      value: [groupByHour(response.date), response.responseTime] as [string, number],
      date: response.date,
      responseCode: response.responseCode,
    })),
  }));

  return scatterData;
};
