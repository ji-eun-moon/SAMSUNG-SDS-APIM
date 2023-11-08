import { useQuery } from 'react-query';
import { IChartParams, TApiUsageList } from '@/types/Statistics';
import { getMonthlyUsage, getDailyUsage, getHourlyUsage } from '@/utils/axios/statistics';
import { formatTimeToHHMM } from '@/utils/chartData';

function useUsageData({ apiId, teamName }: IChartParams) {
  // 월간 데이터 가져오기
  const {
    data: monthlyData,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
  } = useQuery<TApiUsageList>(
    [`monthlyUsage_${apiId}_${teamName}`, { apiId, teamName }],
    () => getMonthlyUsage({ apiId, teamName }),
    {
      enabled: !!apiId && !!teamName,
    },
  );

  // 일간 데이터 가져오기
  const {
    data: dailyData,
    isLoading: isDailyLoading,
    isError: isDailyError,
  } = useQuery<TApiUsageList>(
    [`dailyUsage_${apiId}_${teamName}`, { apiId, teamName }],
    () => getDailyUsage({ apiId, teamName }),
    {
      enabled: !!apiId && !!teamName,
    },
  );

  // 시간별 데이터 가져오기
  const {
    data: hourlyData,
    isLoading: isHourlyLoading,
    isError: isHourlyError,
  } = useQuery<TApiUsageList>(
    [`hourlyUsage_${apiId}_${teamName}`, { apiId, teamName }],
    () => getHourlyUsage({ apiId, teamName }),
    {
      enabled: !!apiId && !!teamName,
    },
  );

  // 시간 데이터 가공
  const formatData = (data: TApiUsageList) => {
    if (!data) return [];
    // 시간 데이터 가공
    const formattedData = data.map((item) => ({
      ...item,
      date: formatTimeToHHMM(item.date),
    }));
    return formattedData;
  };

  return {
    monthlyData,
    isMonthlyLoading,
    isMonthlyError,
    dailyData,
    isDailyLoading,
    isDailyError,
    hourlyData: formatData(hourlyData as TApiUsageList),
    isHourlyLoading,
    isHourlyError,
  };
}

export default useUsageData;
