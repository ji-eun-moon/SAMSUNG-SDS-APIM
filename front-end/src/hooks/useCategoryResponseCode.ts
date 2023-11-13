import { useQuery } from 'react-query';
import { ICategoryChartParams, TCategoryResponseCodeList } from '@/types/Statistics';
import { getCategoryResponseCode } from '@/utils/axios/statistics';

function useCategoryResponseCode({ categoryId, teamName, type }: ICategoryChartParams) {
  // 응답 코드 데이터 가져오기
  const {
    data: responseCodeData,
    isLoading: isResponseCodeLoading,
    isError: isResponseCodeError,
    refetch: refetchResponseCode,
  } = useQuery<TCategoryResponseCodeList>(
    [`responseCode`, { categoryId, teamName, type }],
    () => getCategoryResponseCode({ categoryId, teamName, type }),
    {
      enabled: !!categoryId && !!teamName,
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

export default useCategoryResponseCode;
