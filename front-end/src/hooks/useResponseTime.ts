import { useQuery } from 'react-query';
import { IChartParams, TResponseTimeList } from '@/types/Statistics';
import { getResponseTime } from '@/utils/axios/statistics';

function useResponseTime({ apiId, teamName }: IChartParams) {
  // 응답 시간 데이터 가져오기
  const {
    data: responseTimeData,
    isLoading: isResponseTimeLoading,
    isError: isResponseTimeError,
    refetch: refetchResponseTime,
  } = useQuery<TResponseTimeList>(
    [`responseTime_${apiId}_${teamName}`, { apiId, teamName }],
    () => getResponseTime({ apiId, teamName }),
    {
      enabled: !!apiId && !!teamName,
    },
  );

  return {
    responseTimeData,
    isResponseTimeLoading,
    isResponseTimeError,
    refetchResponseTime,
  };
}

export default useResponseTime;
