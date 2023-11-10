import React, { useEffect, useRef } from 'react';
import { PieChartProps } from '@/types/props/ChartProps';
import * as echarts from 'echarts';

function PieChart({ title, chartData }: PieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const options: echarts.EChartOption = {
        title: {
          text: title,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          right: 5,
          top: 'middle',
          itemGap: 0,
        },
        series: [
          {
            type: 'pie',
            radius: ['0%', '80%'],
            center: ['50%', '50%'],
            data: chartData,
            label: {
              show: true,
              formatter: '{d}%',
            },
            labelLine: {
              length: 5,
              length2: 5,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      chart.setOption(options);
      return () => {
        chart.dispose();
      };
    }
  }, [chartData, title]);

  return <div ref={chartRef} style={{ width: '100%', height: '250px' }} />;
}

export default PieChart;
