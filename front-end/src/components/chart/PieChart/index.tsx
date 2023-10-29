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
          right: 20,
          top: 'middle',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: chartData,
            label: {
              show: true,
              formatter: '{d}%',
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

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}

export default PieChart;
