import React, { useEffect, useRef } from 'react';
import { PieChartProps } from '@/types/props/ChartProps';
import * as echarts from 'echarts';

function PieChart({ title, chartData, pieColors }: PieChartProps) {
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
          left: '80%',
          top: 'middle',
        },
        series: [
          {
            type: 'pie',
            radius: ['0%', '80%'],
            center: ['40%', '50%'],
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
            itemStyle: {
              color(params: echarts.EChartOption.Tooltip.Format) {
                if (typeof params.dataIndex === 'number') {
                  // 각 데이터 항목마다 다른 색상을 지정
                  const colors = pieColors;
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
  }, [chartData, title, pieColors]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
}

export default PieChart;
