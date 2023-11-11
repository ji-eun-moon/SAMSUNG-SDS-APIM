import { useQuery } from 'react-query';
import { ICategoryChartParams, ICategoryUsage } from '@/types/Statistics';
import { getCategoryUsage } from '@/utils/axios/statistics';

function useCategoryUsage({ categoryId, teamName, type }: ICategoryChartParams) {
  const {
    data: categoryUsageData,
    isLoading: categoryUsageLoading,
    isError: categoryUsageError,
    refetch: refetchCategoryUsage,
  } = useQuery<ICategoryUsage[]>(
    [`categoryUsage`, { categoryId, teamName, type }],
    () => getCategoryUsage({ categoryId, teamName, type }),
    {
      enabled: !!categoryId && !!teamName,
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