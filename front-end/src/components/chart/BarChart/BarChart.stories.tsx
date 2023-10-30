import BarChart from '.';

export default {
  title: 'chart/BarChart',
  tags: ['autodocs'],
  component: BarChart,
  argTypes: {
    title: {
      description: '차트 제목',
    },
    chartDataValue: {
      description: '차트 y축 값 리스트',
    },
    chartDataName: {
      description: '차트 x축 이름 리스트',
    },
    barColors: {
      description: '각 항목의 Bar 색상',
    },
  },
};

export const ErrorChart = {
  args: {
    title: '에러 및 오류율',
    chartDataValue: [1048, 735, 580, 300, 300],
    chartDataName: ['404', '403', '500', '400', '401'],
    barColors: ['#FEAEAE', '#FDD09F', '#FBE38E', '#A9F4D0', '#D0E8FF', '#9A89FF'],
  },
};
