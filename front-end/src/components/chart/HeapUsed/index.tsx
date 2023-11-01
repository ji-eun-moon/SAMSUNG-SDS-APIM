import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const SemiCircleChart: React.FC<{ title: string; chartDataValue: number }> = ({ title, chartDataValue }) => {
  const chartRef = useRef<HTMLDivElement>(null);

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
        series: [
          {
            name: '진행률',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            detail: { formatter: '{value}%' },
            data: [{ value: chartDataValue }],
            axisLine: {
              lineStyle: {
                width: 20, // 두께
                color: [
                  [0.6, '#90BE6D'],
                  [0.85, '#FFE55F'],
                  [1, '#F94144'],
                ],
              },
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            title: {
              show: true, // 여기를 false로 설정하면 게이지 내부의 제목이 사라집니다.
              offsetCenter: [0, '50%'],
            },
          },
        ],
      };

      chart.setOption(options);
      return () => chart.dispose();
    }
    return undefined;
  }, [title, chartDataValue]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default SemiCircleChart;
