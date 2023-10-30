import LineChart from '.';

export default {
  title: 'chart/LineChart',
  tags: ['autodocs'],
  component: LineChart,
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
    chartColor: {
      description: 'Chart 색상',
    },
    isSmooth: {
      description: '곡선 여부',
    },
  },
};

export const SmoothChart = {
  args: {
    title: '월간 사용량',
    isSmooth: true,
    chartColor: '#FEAEAE',
    chartDataValue: [820, 932, 901, 934, 1290, 1330],
    chartDataName: ['2023-10', '2023-09', '2023-08', '2023-07', '2023-06', '2023-05'],
  },
};

export const NotSmmothChart = {
  args: {
    title: '월간 사용량',
    isSmooth: false,
    chartColor: '#FDD09F',
    chartDataValue: [820, 932, 901, 934, 1290, 1330, 1320],
    chartDataName: ['2023-10', '2023-09', '2023-08', '2023-07', '2023-06', '2023-05'],
  },
};
