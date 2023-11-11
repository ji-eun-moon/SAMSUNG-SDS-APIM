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
      const totalValue = chartData?.reduce((acc, data) => acc + data.value, 0);

      const options: echarts.EChartOption = {
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
            // data: chartData,
            data: chartData.map((data, index) => ({
              ...data,
              itemStyle: {
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
                ][index],
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

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
};

export default DonutChart;
