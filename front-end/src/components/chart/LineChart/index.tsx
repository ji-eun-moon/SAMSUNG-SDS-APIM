import React, { useEffect, useRef } from 'react';
import { LineChartProps, ResponseTimeChartProps } from '@/types/props/ChartProps';
import * as echarts from 'echarts';
import { formatTimeToHHMM } from '@/utils/format';

function LineChart({ type, title, isSmooth, chartColor, chartDataValue, chartDataName, ...props }: LineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (type === 'ResponseTime') {
      const { responseCodeList } = props as ResponseTimeChartProps;
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
            data: chartDataName.map((item: string) => formatTimeToHHMM(item)),
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
            formatter: (params: echarts.EChartOption.Tooltip.Format[]) => {
              const { dataIndex } = params[0] as { dataIndex: number };
              const xValue = chartDataName[dataIndex];
              const yValue = chartDataValue[dataIndex];
              const responseCode = responseCodeList ? responseCodeList[dataIndex] : undefined;

              // responseCode에 따라 색상 선택
              let responseCodeColor = '';
              if (responseCode) {
                if (responseCode.toString().startsWith('2')) {
                  responseCodeColor = '#51AF5B';
                } else if (responseCode.toString().startsWith('4')) {
                  responseCodeColor = '#F4DF6F';
                } else if (responseCode.toString().startsWith('5')) {
                  responseCodeColor = '#FF0000';
                }
              }

              return `
                <div>
                  <div>${xValue}</div>
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="background-color:${chartColor}; width:10px; height:10px; border-radius: 100%;"></div>
                    <div style="font-weight: 900;">${yValue} ms</div>
                  </div>
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>status</div>
                    <div style="font-weight: 700; color:${responseCodeColor}">${responseCode}</div>
                  </div>
                </div>
              `;
            },
          },
        };
        chart.setOption(options);
        return () => {
          chart.dispose();
        };
      }
    }

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
  }, [title, isSmooth, chartColor, chartDataName, chartDataValue, type, props]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
}
export default LineChart;
