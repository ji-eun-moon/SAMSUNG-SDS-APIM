import { useQuery } from 'react-query';
import { TCategoryList } from '@/types/Api';
import { getCategoryList } from '@/utils/axios/api';

function useApi() {
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);

  const firstCategoryId = categoryList?.[0]?.categoryId ?? 0;
  const firstApiId = categoryList?.[0]?.apiList[0].apiId ?? 0;

  return {
    categoryList,
    firstCategoryId,
    firstApiId,
  };
}

export default useApi;
