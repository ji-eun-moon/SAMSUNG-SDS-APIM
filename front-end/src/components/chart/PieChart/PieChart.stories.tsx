import PieChart from '.';

export default {
  title: 'chart/PieChart',
  tags: ['autodocs'],
  component: PieChart,
  argTypes: {
    title: {
      description: '차트 제목',
    },
    chartData: {
      description: '차트에 들어갈 항목',
    },
  },
};

export const ErrorChart = {
  args: {
    title: '에러 및 오류율',
    chartData: [
      { value: 1048, name: '404' },
      { value: 735, name: '403' },
      { value: 580, name: '500' },
      { value: 300, name: '400' },
      { value: 300, name: '401' },
    ],
  },
};
