import { useState } from 'react';
import useUsageData from '@/hooks/useUsageData';
import { usageData } from '@/utils/chartData';
import LineChart from '@/components/chart/LineChart';
import ChartFrame from '@/components/atoms/ChartFrame';
import { Spinner } from '@nextui-org/react';
import CustomSelect from '@/components/atoms/CustomSelect';
import Refresh from '@/components/atoms/Refresh';

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
  const [selected, setSelected] = useState('월별');
  const {
    monthlyData,
    isMonthlyLoading,
    dailyData,
    isDailyLoading,
    hourlyData,
    isHourlyLoading,
    refetchMonthly,
    refetchDaily,
    refetchHourly,
  } = useUsageData({
    apiId,
    teamName,
  });
  const [selectedChart, setSelectedChart] = useState<ChartType>(ChartType.Monthly);

  if (isMonthlyLoading || isDailyLoading || isHourlyLoading || !monthlyData || !dailyData || !hourlyData) {
    return (
      <ChartFrame>
        <div className="flex items-center justify-center" style={{ height: '200px' }}>
          <Spinner />
        </div>
      </ChartFrame>
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

  const handleSelectChange = (value: string) => {
    setSelected(value);
    switch (value) {
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

  const refreshData = () => {
    switch (selectedChart) {
      case ChartType.Monthly:
        refetchMonthly();
        break;
      case ChartType.Daily:
        refetchDaily();
        break;
      case ChartType.Hourly:
        refetchHourly();
        break;
      default:
        refetchMonthly();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div>사용량</div>
        <div className="flex gap-2">
          <div className="w-28">
            <CustomSelect items={['월별', '일별', '시간별']} value={selected} onChange={handleSelectChange} />
          </div>
          <Refresh onClick={refreshData} />
        </div>
      </div>
      <ChartFrame>
        <LineChart
          type="Usage"
          title={chartTitle}
          isSmooth={false}
          chartDataName={chartData.xValues}
          chartDataValue={chartData.yValues}
          chartColor="#FEAEAE"
        />
      </ChartFrame>
    </div>
  );
}

export default Usage;
