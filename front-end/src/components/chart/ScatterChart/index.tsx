import React, { useEffect, useRef } from 'react';
import { ScatterChartProps } from '@/types/props/ChartProps';
// import { formatTimeToHHMM } from '@/utils/format';
import * as echarts from 'echarts';

const ScatterChart = ({ chartData }: ScatterChartProps) => {
  const chartRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const options: echarts.EChartOption = {
        grid: {
          top: '10%',
          right: '32%',
          bottom: '10%',
          left: '5%',
        },
        legend: {
          show: true,
          left: '70%',
          top: 'middle',
          orient: 'vertical',
          type: 'scroll',
          scrollDataIndex: 0,
          pageIconColor: '#17468f',
          pageIconInactiveColor: '#9a9a9a',
          pageIconSize: 10,
          pageTextStyle: {
            color: 'black',
          },
          pageButtonItemGap: 5,
          formatter(name) {
            // 범례 아이템 이름이 너무 길 때 줄 바꿈 처리
            const maxLength = 25; // 원하는 최대 길이 설정
            if (name.length > maxLength) {
              return `${name.slice(0, maxLength)}\n${name.slice(maxLength)}`;
            }
            return name;
          },
        },
        tooltip: {
          trigger: 'item',
          formatter(params: echarts.EChartOption.Tooltip.Format) {
            const { data } = params;
            // responseCode에 따라 색상 선택
            let responseCodeColor = '';
            if (data.responseCode) {
              if (data.responseCode.toString().startsWith('2')) {
                responseCodeColor = '#51AF5B';
              } else if (data.responseCode.toString().startsWith('4')) {
                responseCodeColor = '#F4DF6F';
              } else if (data.responseCode.toString().startsWith('5')) {
                responseCodeColor = '#FF0000';
              }
            }
            return `
                <div>
                <div style="font-weight: 500;">${data.date}</div>
                  <div>${params.seriesName}</div>
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="font-weight: 900;">${data.responseTime} ms</div>
                  </div>
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>status</div>
                    <div style="font-weight: 700; color:${responseCodeColor}">${data.responseCode}</div>
                  </div>
                </div>
              `;
          },
        },
        xAxis: {
          type: 'time',
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        series: chartData.map((dataSeries) => ({
          ...dataSeries,
          type: 'scatter',
        })),
      };
      chart.setOption(options);
      return () => {
        chart.dispose();
      };
    }
  }, [chartData]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
};

export default ScatterChart;
