declare module 'echarts' {
  export interface EChartOption {
    tooltip?: EChartOption.Tooltip;
  }

  namespace EChartOption {
    interface Tooltip {
      formatter?: string | Formatter | ((params: Format[]) => string);
    }
  }
}
