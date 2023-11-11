export interface IPieChartData {
  value: number;
  name: string;
}

export interface PieChartProps {
  title: string;
  pieColors: string[];
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

export interface ScatterDataItem {
  name: string;
  type: string;
  data: Array<{
    value: [string, number]; // 날짜와 응답 시간
    date: string;
    responseCode: string; // 응답 코드
  }>;
}

export type FormattedScatterData = ScatterDataItem[];

export interface ScatterChartProps {
  chartData: FormattedScatterData;
}
