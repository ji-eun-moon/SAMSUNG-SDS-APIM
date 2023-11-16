import { useState } from 'react';
import useUsageData from '@/hooks/useUsageData';
import { usageData } from '@/utils/chartData';
import LineChart from '@/components/chart/LineChart';
import ChartFrame from '@/components/atoms/ChartFrame';
import { Spinner } from '@nextui-org/react';
import CustomSelect from '@/components/atoms/CustomSelect';
// import Refresh from '@/components/atoms/Refresh';

interface Props {
  apiId: number;
  teamName: string;
  type: 'use' | 'provide';
}

enum ChartType {
  Monthly,
  Daily,
  Hourly,
}

function Usage({ apiId, teamName, type }: Props) {
  const [selected, setSelected] = useState('월별');
  const {
    monthlyData,
    isMonthlyLoading,
    dailyData,
    isDailyLoading,
    hourlyData,
    isHourlyLoading,
    // refetchMonthly,
    // refetchDaily,
    // refetchHourly,
  } = useUsageData({
    apiId,
    teamName,
    type,
  });
  const [selectedChart, setSelectedChart] = useState<ChartType>(ChartType.Monthly);

  const isLoading = isMonthlyLoading || isDailyLoading || isHourlyLoading;

  if (!monthlyData || !dailyData || !hourlyData) {
    return (
      <div className="my-8">
        <ChartFrame>
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        </ChartFrame>
      </div>
    );
  }

  const handleChartChange = (chartType: ChartType) => {
    setSelectedChart(chartType);
  };

  let chartData;
  switch (selectedChart) {
    case ChartType.Monthly:
      chartData = usageData(monthlyData);
      break;
    case ChartType.Daily:
      chartData = usageData(dailyData);
      break;
    case ChartType.Hourly:
      chartData = usageData(hourlyData);
      break;
    default:
      chartData = usageData(monthlyData); // 기본값 설정
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

  // const refreshData = () => {
  //   switch (selectedChart) {
  //     case ChartType.Monthly:
  //       refetchMonthly();
  //       break;
  //     case ChartType.Daily:
  //       refetchDaily();
  //       break;
  //     case ChartType.Hourly:
  //       refetchHourly();
  //       break;
  //     default:
  //       refetchMonthly();
  //   }
  // };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div>{type === 'use' ? 'Usage By Api' : 'Api Calls'}</div>
        <div className="flex gap-2">
          <div className="w-28">
            <CustomSelect
              items={['월별', '일별', '시간별']}
              value={selected}
              onChange={handleSelectChange}
              height="30px"
            />
          </div>
          {/* <Refresh onClick={refreshData} /> */}
        </div>
      </div>
      <ChartFrame>
        {isLoading ? (
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        ) : (
          <LineChart
            isSmooth={false}
            chartDataName={chartData.xValues}
            chartDataValue={chartData.yValues}
            chartColor="#8FCACA"
          />
        )}
      </ChartFrame>
    </div>
  );
}

export default Usage;
