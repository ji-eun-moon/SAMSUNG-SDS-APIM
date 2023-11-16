import React, { useEffect, useRef } from 'react';
import { hexToRGBA } from '@/utils/format';
import * as echarts from 'echarts';

interface LineChartData {
  name: string;
  data: number[];
  color: string; // 선과 영역의 색상
}

interface ThreeLineChartProps {
  chartData: LineChartData[];
  chartDataTime: string[];
}

function ThreeLineChart({ chartData, chartDataTime }: ThreeLineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // series 배열 동적 생성
  const series = chartData.map((data) => ({
    name: data.name,
    data: data.data,
    type: 'line',
    areaStyle: {
      color: hexToRGBA(data.color, 0.2),
    },
    itemStyle: {
      color: data.color,
    },
  }));

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
          data: chartDataTime,
        },
        yAxis: {
          type: 'value',
          splitNumber: 3,
        },
        series,
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
  }, [chartDataTime, chartData, series]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
}

export default ThreeLineChart;
