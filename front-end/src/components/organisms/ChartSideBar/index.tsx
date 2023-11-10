// import SideBarBody from '@/components/atoms/SideBarBody';
import { TCategoryList } from '@/types/Api';
import { getUseCategoryList } from '@/utils/axios/api';
import { useQuery } from 'react-query';
import useUserStore from '@/store/useUserStore';
import useApiStore from '@/store/useApiStore';
import PageLoading from '@/components/atoms/PageLoading';
import CategoryList from '../CategoryList';

function ChartSideBar() {
  const { selectedTeam } = useUserStore();
  const { selectApi, selectedApi } = useApiStore();
  const { data: useCategoryList } = useQuery<TCategoryList>(
    `useCategoryList ${selectedTeam}`,
    async () => {
      const result: TCategoryList = await getUseCategoryList(selectedTeam || '');
      if (result && result.length > 0 && selectedApi.id === 0) {
        selectApi(result[0].apiList[0].apiName, result[0].apiList[0].apiId);
      }
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
    <div className="p-5">
      <div className="my-2 font-bold text-xl itdaText">API 사용 통계</div>
      {firstCategory === -1 ? (
        <div className="flex itdaSecondary my-5 text-sm">사용중인 API가 없습니다.</div>
      ) : (
        <CategoryList categoryList={useCategoryList} openCategory={firstCategory} my={false} type="statistics" />
      )}
    </div>
  );
}

export default ChartSideBar;
