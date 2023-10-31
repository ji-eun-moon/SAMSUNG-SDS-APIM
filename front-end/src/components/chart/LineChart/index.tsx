import React, { useEffect, useRef } from 'react';
import { LineChartProps } from '@/types/props/ChartProps';
import * as echarts from 'echarts';

function LineChart({ title, isSmooth, isBackground, chartColor, chartDataValue, chartDataName }: LineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const options: echarts.EChartOption = {
        xAxis: {
          type: 'category',
          data: chartDataName,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: chartDataValue,
            type: 'line',
            smooth: isSmooth,
            areaStyle: isBackground ? {} : undefined,
            itemStyle: {
              color: chartColor,
            },
          },
        ],
      };
      chart.setOption(options);
      return () => {
        chart.dispose();
      };
    }
  }, [title, isSmooth, isBackground, chartColor, chartDataName, chartDataValue]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}

export default LineChart;
