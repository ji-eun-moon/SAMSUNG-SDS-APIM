import ThreeLineChart from '.';

export default {
  title: 'chart/ThreeLineChart',
  tags: ['autodocs'],
  component: ThreeLineChart,
  argTypes: {
    chartDataValue1: {
      description: '1번째 라인 차트 y축 값 리스트',
      control: {
        type: 'array',
        maxItems: 8,
      },
    },
    chartDataValue2: {
      description: '2번째 라인 차트 y축 값 리스트',
      control: {
        type: 'array',
        maxItems: 8,
      },
    },
    chartDataValue3: {
      description: '3번째 라인 차트 y축 값 리스트',
      control: {
        type: 'array',
        maxItems: 8,
      },
    },
    chartDataTime: {
      description: '차트 x축 시간 리스트',
      control: {
        type: 'array',
        maxItems: 8,
      },
    },
  },
};

export const DynamicThreeLineChart = {
  args: {
    chartDataValue1: [100, 180, 250, 230, 160, 80, 190, 210],
    chartDataValue2: [50, 140, 270, 180, 90, 260, 200, 180],
    chartDataValue3: [70, 230, 160, 290, 130, 200, 220, 240],
    chartDataTime: ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00', '11:10'],
  },
};
