import React, { useEffect, useRef } from 'react';
import { BarChartProps } from '@/types/props/ChartProps';
import * as echarts from 'echarts';

function BarChart({ title, chartDataValue, chartDataName, barColors }: BarChartProps) {
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
        xAxis: {
          type: 'category',
          data: chartDataName,
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            data: chartDataValue,
            type: 'bar',
            itemStyle: {
              color(params: echarts.EChartOption.Tooltip.Format) {
                if (typeof params.dataIndex === 'number') {
                  // 각 데이터 항목마다 다른 색상을 지정
                  const colors = barColors;
                  return colors[params.dataIndex];
                }
                return '#000'; // 기본 색상 설정 또는 다른 예외 처리
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
  }, [title, chartDataValue, chartDataName, barColors]);

  return <div ref={chartRef} style={{ width: '100%', height: '350px' }} />;
}

export default BarChart;
