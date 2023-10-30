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

export interface LineChartProps {
  title: string;
  isSmooth: boolean;
  chartColor: string;
  chartDataValue: number[];
  chartDataName: string[];
}
