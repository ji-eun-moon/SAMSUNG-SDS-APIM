import { useQuery } from 'react-query';
import { IChartParams, TResponseCodeList } from '@/types/Statistics';
import { getResponseCode } from '@/utils/axios/statistics';

function useResponseCode({ apiId, teamName }: IChartParams) {
  // 응답 코드 데이터 가져오기
  const {
    data: responseCodeData,
    isLoading: isResponseCodeLoading,
    isError: isResponseCodeError,
    refetch: refetchResponseCode,
  } = useQuery<TResponseCodeList>(
    [`responseCode_${apiId}_${teamName}`, { apiId, teamName }],
    () => getResponseCode({ apiId, teamName }),
    {
      enabled: !!apiId && !!teamName,
    },
  );

  return {
    responseCodeData,
    isResponseCodeLoading,
    isResponseCodeError,
    refetchResponseCode,
  };
}

export default useResponseCode;
