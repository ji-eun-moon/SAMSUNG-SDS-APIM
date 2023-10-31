import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DonutChartData {
  value: number;
  name: string;
}

interface DonutChartProps {
  title: string;
  chartData: DonutChartData[];
}

const DonutChart: React.FC<DonutChartProps> = ({ title, chartData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const totalValue = chartData.reduce((acc, data) => acc + data.value, 0);

      const options: echarts.EChartOption = {
        title: {
          text: title,
          subtext: totalValue.toLocaleString(),
          left: '49.5%', // 원의 가로 중앙으로 이동
          top: '46%', // 타이틀 수직축
          textAlign: 'center', // 텍스트를 가로 중앙에 정렬
          textVerticalAlign: 'middle', // 텍스트를 세로 중앙에 정렬
          textStyle: {
            fontSize: 22,
          },
          subtextStyle: {
            fontSize: 24,
          },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'middle',
        },
        series: [
          {
            name: 'API Access',
            type: 'pie',
            radius: ['45%', '60%'], // 도넛의 두께
            label: {
              show: false,
              position: 'inside',
            },
            labelLine: {
              show: false,
            },
            data: chartData.map((data, index) => ({
              ...data,
              itemStyle: {
                color: ['#95B7E1', '#C4DEFF', '#E8F2F9', '#E7E7E7'][index],
              },
            })),
          },
        ],
      };
      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
    return undefined;
  }, [chartData, title]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default DonutChart;
