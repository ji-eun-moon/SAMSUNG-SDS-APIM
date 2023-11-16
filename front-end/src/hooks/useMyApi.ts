import { useQuery } from 'react-query';
import { TCategoryList } from '@/types/Api';
import { getUseCategoryList, getProvideCategoryList } from '@/utils/axios/api';

function useMyApi(teamName: string) {
  const { data: useCategoryList } = useQuery<TCategoryList>(
    `useCategoryList ${teamName}`,
    async () => {
      const result = await getUseCategoryList(teamName || '');
      return result;
    },
    {
      enabled: Boolean(teamName),
    },
  );

  const { data: provideCategoryList } = useQuery<TCategoryList>(
    `provideCategoryList ${teamName}`,
    async () => {
      const result = await getProvideCategoryList(teamName || '');
      return result;
    },
    {
      enabled: Boolean(teamName),
    },
  );

  const firstUseCategoryId = useCategoryList?.[0]?.categoryId ?? 0;
  const firstProvideCategoryId = provideCategoryList?.[0]?.categoryId ?? 0;

  return {
    useCategoryList,
    provideCategoryList,
    firstUseCategoryId,
    firstProvideCategoryId,
  };
}

export default useMyApi;
