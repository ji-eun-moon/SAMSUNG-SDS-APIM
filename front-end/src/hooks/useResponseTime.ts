import { useQuery } from 'react-query';
import { IChartParams, TResponseTimeList } from '@/types/Statistics';
import { getResponseTime } from '@/utils/axios/statistics';

function useResponseTime({ apiId, teamName, type }: IChartParams) {
  // 응답 시간 데이터 가져오기
  const {
    data: responseTimeData,
    isFetching: isResponseTimeLoading,
    isError: isResponseTimeError,
    refetch: refetchResponseTime,
  } = useQuery<TResponseTimeList>(
    [`responseTime`, { apiId, teamName, type }],
    () => getResponseTime({ apiId, teamName, type }),
    {
      enabled: !!apiId && !!teamName,
      refetchOnWindowFocus: false,
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
