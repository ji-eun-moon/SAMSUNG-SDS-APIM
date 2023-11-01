import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface LongLineChartProps {
  title: string;
  color: string;
  dataValues: number[];
  dataNames: string[];
}

const LongLineChart: React.FC<LongLineChartProps> = ({ title, color, dataValues, dataNames }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (chartRef.current) {
      const options: echarts.EChartOption = {
        title: {
          left: 'center',
          text: title,
        },
        tooltip: {
          trigger: 'axis',
          position(pt) {
            return [pt[0], '10%'];
          },
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dataNames,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
        },
        series: [
          {
            name: title,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              color,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)',
                },
                {
                  offset: 1,
                  color,
                },
              ]),
            },
            emphasis: {
              itemStyle: {
                borderWidth: 3,
                borderColor: 'yellow',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            data: dataValues,
          },
        ],
      };

      const chart = echarts.init(chartRef.current);
      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
  }, [title, color, dataValues, dataNames]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LongLineChart;
