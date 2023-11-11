import { useQuery } from 'react-query';
import { ICategoryChartParams, TCategoryUsageList } from '@/types/Statistics';
import { getCategoryMonthlyUsage, getCategoryDailyUsage, getCategoryHourlyUsage } from '@/utils/axios/statistics';
import { formatTimeToHHMM } from '@/utils/format';

function useCategoryListUsage({ categoryId, teamName, type }: ICategoryChartParams) {
  // 월간 데이터 가져오기
  const {
    data: monthlyData,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
    refetch: refetchMonthly,
  } = useQuery<TCategoryUsageList>(
    [`monthlyUsage`, { categoryId, teamName, type }],
    () => getCategoryMonthlyUsage({ categoryId, teamName, type }),
    {
      enabled: !!categoryId && !!teamName,
    },
  );

  // 일간 데이터 가져오기
  const {
    data: dailyData,
    isLoading: isDailyLoading,
    isError: isDailyError,
    refetch: refetchDaily,
  } = useQuery<TCategoryUsageList>(
    [`dailyUsage`, { categoryId, teamName, type }],
    () => getCategoryDailyUsage({ categoryId, teamName, type }),
    {
      enabled: !!categoryId && !!teamName,
    },
  );

  // 시간별 데이터 가져오기
  const {
    data: hourlyData,
    isLoading: isHourlyLoading,
    isError: isHourlyError,
    refetch: refetchHourly,
  } = useQuery<TCategoryUsageList>(
    [`hourlyUsage`, { categoryId, teamName, type }],
    () => getCategoryHourlyUsage({ categoryId, teamName, type }),
    {
      enabled: !!categoryId && !!teamName,
    },
  );

  // 시간 데이터 가공
  const formatData = (data: TCategoryUsageList) => {
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
    hourlyData: formatData(hourlyData as TCategoryUsageList),
    isHourlyLoading,
    isHourlyError,
    refetchMonthly,
    refetchDaily,
    refetchHourly,
  };
}

export default useCategoryListUsage;
