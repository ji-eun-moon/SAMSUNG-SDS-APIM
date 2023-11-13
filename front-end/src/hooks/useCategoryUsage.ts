import { useQuery } from 'react-query';
import { ICategoryChartParams, ICategoryUsage } from '@/types/Statistics';
import { getCategoryUsage } from '@/utils/axios/statistics';

function useCategoryUsage({ categoryId, teamName, type }: ICategoryChartParams) {
  const {
    data: categoryUsageData,
    isFetching: categoryUsageLoading,
    isError: categoryUsageError,
    refetch: refetchCategoryUsage,
  } = useQuery<ICategoryUsage[]>(
    [`categoryUsage`, { categoryId, teamName, type }],
    () => getCategoryUsage({ categoryId, teamName, type }),
    {
      enabled: !!categoryId && !!teamName,
      refetchOnWindowFocus: false,
    },
  );

  return {
    categoryUsageData,
    categoryUsageLoading,
    categoryUsageError,
    refetchCategoryUsage,
  };
}

export default useCategoryUsage;
