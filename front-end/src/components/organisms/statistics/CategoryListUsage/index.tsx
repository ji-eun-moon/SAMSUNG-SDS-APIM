import { useState } from 'react';
import useCategoryListUsage from '@/hooks/useCategoryListUsage';
import { formatCategoryChartData } from '@/utils/chartData';
import ChartFrame from '@/components/atoms/ChartFrame';
import ThreeLineChart from '@/components/chart/ThreeLineChart';
import CustomSelect from '@/components/atoms/CustomSelect';
import Refresh from '@/components/atoms/Refresh';
import { Spinner } from '@nextui-org/react';

interface Props {
  categoryId: number;
  teamName: string;
  type: 'use' | 'provide';
}

enum ChartType {
  Monthly,
  Daily,
  Hourly,
}

function CategoryListUsage({ categoryId, teamName, type }: Props) {
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
  } = useCategoryListUsage({
    categoryId,
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
      chartData = formatCategoryChartData(monthlyData);
      break;
    case ChartType.Daily:
      chartData = formatCategoryChartData(dailyData);
      break;
    case ChartType.Hourly:
      chartData = formatCategoryChartData(hourlyData);
      break;
    default:
      chartData = formatCategoryChartData(monthlyData); // 기본값 설정
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
        <div>{type === 'use' ? 'Usage By Api' : 'Api Calls'}</div>
        <div className="flex gap-2">
          <div className="w-28">
            <CustomSelect
              height="30px"
              items={['월별', '일별', '시간별']}
              value={selected}
              onChange={handleSelectChange}
            />
          </div>
          <Refresh onClick={refreshData} />
        </div>
      </div>
      <ChartFrame>
        {isLoading ? (
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        ) : (
          <ThreeLineChart chartData={chartData.formattedChartData} chartDataTime={chartData.chartDataTime} />
        )}
      </ChartFrame>
    </div>
  );
}

export default CategoryListUsage;
