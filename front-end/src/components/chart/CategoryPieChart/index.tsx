import React, { useEffect, useRef } from 'react';
import { IApiCount } from '@/types/Statistics';
import { PieChartProps } from '@/types/props/ChartProps';
import * as echarts from 'echarts';

function CategoryPieChart({ title, chartData, pieColors }: PieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const formattedChartData = chartData.map((item, index) => ({
    ...item,
    color: pieColors[index % pieColors.length],
  }));

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
          formatter: (params: echarts.EChartOption.Tooltip.Format) => {
            const data = params.data as { name: string; value: number; countList: IApiCount[]; color: string };
            let tooltipHtml = `<div style="padding: 10px;">`;
            tooltipHtml += `<div style="display: flex; align-items: center; justify-content: space-between;">
                              <div style="display: flex; align-items: center; gap: 0.25rem;">
                                <div style="background-color: ${data.color}; width: 10px; height: 10px; border-radius: 100%;"></div>
                                <div style="font-weight: 700;">${data.name}</div>
                              </div>  
                              <div>${data.value}</div>
                            </div>`;
            data.countList.forEach((apiCount: IApiCount) => {
              tooltipHtml += `<div style="display: flex; align-items: center; justify-content: space-between;">
                                <p style="margin-right: 15px;">${apiCount.title}</p>
                                <p>${apiCount.count}</p>
                              </div>`;
            });
            tooltipHtml += `</div>`;
            return tooltipHtml;
          },
        },
        legend: {
          orient: 'vertical',
          right: 5,
          top: 'middle',
          left: '55%',
        },
        series: [
          {
            type: 'pie',
            radius: ['0%', '90%'],
            center: ['25%', '50%'],
            data: formattedChartData,
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
                  return colors[params.dataIndex % colors.length];
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
  }, [formattedChartData, title, pieColors]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
}

export default CategoryPieChart;
