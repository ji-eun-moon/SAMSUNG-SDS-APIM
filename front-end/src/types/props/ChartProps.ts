export interface IPieChartData {
  value: number;
  name: string;
}

export interface PieChartProps {
  title: string;
  chartData: IPieChartData[];
}

export interface BarChartProps {
  title: string;
  chartDataValue: number[];
  chartDataName: string[];
  barColors: string[];
}

export interface LineChartType {
  type: 'Usage' | 'ResponseTime';
}

export interface UsageChartProps extends LineChartType {
  title: string;
  isSmooth: boolean;
  chartColor: string;
  chartDataValue: number[];
  chartDataName: string[];
}

export interface ResponseTimeChartProps extends LineChartType {
  title: string;
  isSmooth: boolean;
  chartColor: string;
  chartDataValue: number[];
  chartDataName: string[];
  responseCodeList: number[];
}

export type LineChartProps = UsageChartProps | ResponseTimeChartProps;
