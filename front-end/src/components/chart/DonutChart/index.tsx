import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DonutChartData {
  value: number;
  name: string;
}

interface DonutChartProps {
  title: string;
  chartData: DonutChartData[];
  use?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ title, chartData, use }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const totalValue = chartData?.reduce((acc, data) => acc + data.value, 0);

      const options: echarts.EChartOption = {
        color: [
          '#f19365',
          '#adbd6f',
          '#6783e5',
          '#7dcdff',
          '#e3999e',
          '#b4b0a3',
          '#72b6c6',
          '#ebd065',
          '#f1d7a9',
          '#c2b0c9',
        ],
        title: {
          text: title,
          subtext: totalValue?.toLocaleString(),
          left: '24%', // 원의 가로 중앙으로 이동
          top: '46%', // 타이틀 수직축
          textAlign: 'center', // 텍스트를 가로 중앙에 정렬
          textVerticalAlign: 'middle', // 텍스트를 세로 중앙에 정렬
          textStyle: {
            fontSize: 18,
          },
          subtextStyle: {
            fontSize: 20,
          },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          right: 5,
          left: '55%',
          top: 'middle',
          type: 'scroll',
          scrollDataIndex: 0,
          pageIconColor: '#17468f',
          pageIconInactiveColor: '#9a9a9a',
          pageIconSize: 10,
          pageTextStyle: {
            color: 'black',
          },
          formatter(name) {
            let maxLength = 0;
            // 범례 아이템 이름이 너무 길 때 줄 바꿈 처리
            if (use === 'main') {
              maxLength = 17; // 원하는 최대 길이 설정
            } else {
              maxLength = 25;
            }
            if (name.length > maxLength) {
              return `${name.slice(0, maxLength)}\n${name.slice(maxLength)}`;
            }
            return name;
          },
        },
        series: [
          {
            type: 'pie',
            center: ['25%', '50%'],
            radius: ['70%', '90%'], // 도넛의 두께
            label: {
              show: false,
              position: 'inside',
            },
            labelLine: {
              show: false,
            },
            data: chartData,
          },
        ],
      };
      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
    return undefined;
  }, [chartData, title, use]);

  if (use === 'page') {
    return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
  }

  if (use === 'main') {
    return <div ref={chartRef} style={{ width: '100%', height: '190px' }} />;
  }

  return null;
};

DonutChart.defaultProps = {
  use: 'page',
};

export default DonutChart;