import { useState } from 'react';
import useUsageData from '@/hooks/useUsageData';
import { usageData } from '@/utils/chartData';
import LineChart from '@/components/chart/LineChart';
import SelectBox from '@/components/atoms/SelectBox';
import { Spinner } from '@nextui-org/react';

interface Props {
  apiId: number;
  teamName: string;
}

enum ChartType {
  Monthly,
  Daily,
  Hourly,
}

function Usage({ apiId, teamName }: Props) {
  const { monthlyData, isMonthlyLoading, dailyData, isDailyLoading, hourlyData, isHourlyLoading } = useUsageData({
    apiId,
    teamName,
  });
  const [selectedChart, setSelectedChart] = useState<ChartType>(ChartType.Monthly);

  if (isMonthlyLoading || isDailyLoading || isHourlyLoading || !monthlyData || !dailyData || !hourlyData) {
    return (
      <div className="flex items-center justify-center" style={{ height: '200px' }}>
        <Spinner />
      </div>
    );
  }

  const handleChartChange = (chartType: ChartType) => {
    setSelectedChart(chartType);
  };

  let chartData;
  let chartTitle;
  switch (selectedChart) {
    case ChartType.Monthly:
      chartData = usageData(monthlyData);
      chartTitle = '월별 사용량';
      break;
    case ChartType.Daily:
      chartData = usageData(dailyData);
      chartTitle = '일별 사용량';
      break;
    case ChartType.Hourly:
      chartData = usageData(hourlyData);
      chartTitle = '시간별 사용량';
      break;
    default:
      chartData = usageData(monthlyData); // 기본값 설정
      chartTitle = '월별 사용량';
  }

  const handleSelectChange = (selected: string) => {
    switch (selected) {
      case '월별':
        handleChartChange(ChartType.Monthly);
        break;
      case '일별':
        handleChartChange(ChartType.Daily);
        break;
      case '시간별':
        handleChartChange(ChartType.Hourly);
        break;
      default:
        handleChartChange(ChartType.Monthly);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end px-20 mt-2">
        <div className="w-28">
          <SelectBox list={['월별', '일별', '시간별']} defaultSelect="월별" onChange={handleSelectChange} />
        </div>
      </div>
      <LineChart
        type="Usage"
        title={chartTitle}
        isSmooth={false}
        chartDataName={chartData.xValues}
        chartDataValue={chartData.yValues}
        chartColor="#FEAEAE"
      />
    </div>
  );
}

export default Usage;
