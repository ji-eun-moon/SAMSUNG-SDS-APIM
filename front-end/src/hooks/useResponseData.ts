import { useQuery } from 'react-query';
import { IChartParams, TResponseTimeList, TResponseCodeList } from '@/types/Statistics';
import { getResponseTime, getResponseCode } from '@/utils/axios/statistics';

function useResponseData({ apiId, teamName }: IChartParams) {
  // 응답 시간 데이터 가져오기
  const {
    data: responseTimeData,
    isLoading: isResponseTimeLoading,
    isError: isResponseTimeError,
  } = useQuery<TResponseTimeList>(
    [`responseTime_${apiId}_${teamName}`, { apiId, teamName }],
    () => getResponseTime({ apiId, teamName }),
    {
      enabled: !!apiId && !!teamName,
    },
  );

  // 응답 코드 데이터 가져오기
  const {
    data: responseCodeData,
    isLoading: isResponseCodeLoading,
    isError: isResponseCodeError,
  } = useQuery<TResponseCodeList>(
    [`responseCode_${apiId}_${teamName}`, { apiId, teamName }],
    () => getResponseCode({ apiId, teamName }),
    {
      enabled: !!apiId && !!teamName,
    },
  );

  return {
    responseTimeData,
    isResponseTimeLoading,
    isResponseTimeError,
    responseCodeData,
    isResponseCodeLoading,
    isResponseCodeError,
  };
}

export default useResponseData;
