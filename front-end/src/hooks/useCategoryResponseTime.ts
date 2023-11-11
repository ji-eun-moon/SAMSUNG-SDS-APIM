import { useQuery } from 'react-query';
import { ICategoryChartParams, TCategoryResponseTimeList } from '@/types/Statistics';
import { getCategoryResponseTime } from '@/utils/axios/statistics';

function useCategoryResponseTime({ categoryId, teamName, type }: ICategoryChartParams) {
  // 응답 시간 데이터 가져오기
  const {
    data: responseTimeData,
    isLoading: isResponseTimeLoading,
    isError: isResponseTimeError,
    refetch: refetchResponseTime,
  } = useQuery<TCategoryResponseTimeList>(
    [`responseTime`, { categoryId, teamName, type }],
    () => getCategoryResponseTime({ categoryId, teamName, type }),
    {
      enabled: !!categoryId && !!teamName,
    },
  );

  return {
    responseTimeData,
    isResponseTimeLoading,
    isResponseTimeError,
    refetchResponseTime,
  };
}

export default useCategoryResponseTime;
