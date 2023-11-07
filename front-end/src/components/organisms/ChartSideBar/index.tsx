import SideBarBody from '@/components/atoms/SideBarBody';
import { TCategoryList } from '@/types/Api';
import { getUseCategoryList } from '@/utils/axios/api';
import { useQuery } from 'react-query';
import useUserStore from '@/store/useUserStore';
import PageLoading from '@/components/atoms/PageLoading';
import CategoryList from '../CategoryList';

function ChartSideBar() {
  const { selectedTeam } = useUserStore();
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

  if (useCategoryList === undefined) {
    return <PageLoading />;
  }

  const firstCategory = useCategoryList[0]?.categoryId || -1;

  return (
    <SideBarBody>
      <div className="my-2 font-bold text-xl">API 사용 통계</div>
      {firstCategory === -1 ? (
        <div className="flex itdaSecondary my-5 text-sm">사용중인 API가 없습니다.</div>
      ) : (
        <CategoryList categoryList={useCategoryList} openCategory={firstCategory} my={false} type="statistics" />
      )}
    </SideBarBody>
  );
}

export default ChartSideBar;
