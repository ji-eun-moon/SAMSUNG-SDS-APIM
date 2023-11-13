import React, { useEffect, useRef } from 'react';
import { UsageChartProps } from '@/types/props/ChartProps';
import * as echarts from 'echarts';

const LineChart = React.memo(({ isSmooth, chartColor, chartDataValue, chartDataName }: UsageChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const options: echarts.EChartOption = {
        grid: {
          top: '10%',
          right: '10%',
          bottom: '10%',
          left: '10%',
        },
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
            areaStyle: {},
            itemStyle: {
              color: chartColor,
            },
          },
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
      };
      chart.setOption(options);
      return () => {
        chart.dispose();
      };
    }
  }, [isSmooth, chartColor, chartDataName, chartDataValue]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
});
export default LineChart;
