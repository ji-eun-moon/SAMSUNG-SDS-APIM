import { TApiUsageList, TResponseCodeList, TResponseTimeList } from '../types/Statistics';

// time string을 시간:분 형식으로 포맷팅 하는 함수
export const formatTimeToHHMM = (rawTime: string) => {
  const date = new Date(rawTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}`;
  return formattedTime;
};

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
