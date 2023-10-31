import DonutChart from '.';

export default {
  title: 'chart/DonutChart',
  tags: ['autodocs'],
  component: DonutChart,
  argTypes: {
    title: {
      description: '차트 제목',
      control: 'text',
    },
    chartData: {
      description: '차트 데이터 (값과 이름의 쌍)',
      control: 'object',
    },
  },
};

export const APIDonutChart = {
  args: {
    title: '총 사용량',
    chartData: [
      { value: 12234981, name: '잔액조회 API' },
      { value: 9547843, name: '보험금납입조회 API' },
      { value: 3534353, name: '계좌 실명 조회 API' },
      { value: 2544332, name: '기타' },
    ],
  },
};
