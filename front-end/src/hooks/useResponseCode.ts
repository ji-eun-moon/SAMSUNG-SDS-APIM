import { useQuery } from 'react-query';
import { IChartParams, TResponseCodeList } from '@/types/Statistics';
import { getResponseCode } from '@/utils/axios/statistics';

function useResponseCode({ apiId, teamName, type }: IChartParams) {
  // 응답 코드 데이터 가져오기
  const {
    data: responseCodeData,
    isFetching: isResponseCodeLoading,
    isError: isResponseCodeError,
    refetch: refetchResponseCode,
  } = useQuery<TResponseCodeList>(
    [`responseCode`, { apiId, teamName, type }],
    () => getResponseCode({ apiId, teamName, type }),
    {
      enabled: !!apiId && !!teamName,
      refetchOnWindowFocus: false,
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
