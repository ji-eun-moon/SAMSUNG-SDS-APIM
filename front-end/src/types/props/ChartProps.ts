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
}
