import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ThreeLineChartProps {
  chartDataValue1: number[];
  chartDataValue2: number[];
  chartDataValue3: number[];
  chartDataTime: string[];
}

function ThreeLineChart({ chartDataValue1, chartDataValue2, chartDataValue3, chartDataTime }: ThreeLineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const options: echarts.EChartOption = {
        xAxis: {
          type: 'category',
          data: chartDataTime,
        },
        yAxis: {
          type: 'value',
          splitNumber: 3,
        },
        series: [
          {
            name: 'Data Line 1',
            data: chartDataValue1,
            type: 'line',
            areaStyle: {
              color: 'rgba(255, 144, 62, 0.2)', // FF903E의 투명한 배경색
            },
            itemStyle: {
              color: '#FF903E', // 고정된 색상 1
            },
          },
          {
            name: 'Data Line 2',
            data: chartDataValue2,
            type: 'line',
            areaStyle: {
              color: 'rgba(88, 215, 100, 0.2)', // 58D764의 투명한 배경색
            },
            itemStyle: {
              color: '#58D764', // 고정된 색상 2
            },
          },
          {
            name: 'Data Line 3',
            data: chartDataValue3,
            type: 'line',
            areaStyle: {
              color: 'rgba(251, 233, 71, 0.2)', // FBE947의 투명한 배경색
            },
            itemStyle: {
              color: '#FBE947', // 고정된 색상 3
            },
          },
        ],
      };
      chart.setOption(options);
      return () => {
        chart.dispose();
      };
    }
  }, [chartDataTime, chartDataValue1, chartDataValue2, chartDataValue3]);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}

export default ThreeLineChart;
