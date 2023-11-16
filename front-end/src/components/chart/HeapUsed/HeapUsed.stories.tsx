import SemiCircleChart from '.';

export default {
  title: 'chart/SemiCircleChart',
  tags: ['autodocs'],
  component: SemiCircleChart,
  argTypes: {
    title: {
      description: '차트 제목',
    },
    chartDataValue: {
      description: '차트의 값을 나타내는 숫자',
    },
  },
};

export const DefaultSemiCircleChart = {
  args: {
    title: '제목설정하기',
    chartDataValue: 92,
  },
};
