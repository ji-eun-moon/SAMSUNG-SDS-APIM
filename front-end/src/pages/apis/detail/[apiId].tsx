import { NextPage } from 'next';
import BothLayout from '@/components/templates/BothLayout';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { TCategoryList } from '@/types/Api';
import useUserStore from '@/store/useUserStore';
import { getCategoryList, getUseCategoryList, getProvideCategoryList } from '@/utils/axios/api';
import PageLoading from '@/components/atoms/PageLoading';

const ApiDetail: NextPage = () => {
  const router = useRouter();
  const { selectedTeam } = useUserStore();
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  const { data: useCategoryList } = useQuery<TCategoryList>(
    `useCategoryList ${selectedTeam}`,
    async () => {
      const result = await getUseCategoryList(selectedTeam || '');
      return result;
    },
    {
      enabled: Boolean(selectedTeam),
    },
  );
  const { data: provideCategoryList } = useQuery<TCategoryList>(
    `provideCategoryList ${selectedTeam}`,
    async () => {
      const result = await getProvideCategoryList(selectedTeam || '');
      return result;
    },
    {
      enabled: Boolean(selectedTeam),
    },
  );

  if (!categoryList || !useCategoryList || !provideCategoryList) {
    return <PageLoading />;
  }

  return (
    <BothLayout>
      <ApiSideBar
        useCategoryList={useCategoryList}
        provideCategoryList={provideCategoryList}
        openCategory={1}
        categoryList={categoryList}
        defaultSelectedKey={(router.query.defaultSelectedKey as string) || 'all'}
        openMyCategory={1}
      />
      <div>상세 페이지</div>
    </BothLayout>
  );
};

export default ApiDetail;
