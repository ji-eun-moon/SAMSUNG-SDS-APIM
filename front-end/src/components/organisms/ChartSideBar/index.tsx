import useUserStore from '@/store/useUserStore';
import PageLoading from '@/components/atoms/PageLoading';
import useMyApi from '@/hooks/useMyApi';
import useApi from '@/hooks/useApi';
import { Chip } from '@nextui-org/react';
import { useRouter } from 'next/router';
import CategoryList from '../CategoryList';
import styles from './ChartSideBar.module.scss';

interface Props {
  type: 'use' | 'provide' | 'admin';
  openCategoryId: number;
}

function ChartSideBar({ type, openCategoryId }: Props) {
  const router = useRouter();
  const { selectedTeam } = useUserStore();
  const { useCategoryList, provideCategoryList, firstProvideCategoryId, firstUseCategoryId } = useMyApi(selectedTeam);
  const { categoryList } = useApi();

  const sideBarBody = () => {
    if (type === 'use') {
      if (useCategoryList === undefined) {
        return <PageLoading />;
      }
      if (useCategoryList.length === 0) {
        return <div className="my-5 textSecondary text-sm">사용 중인 API가 없습니다.</div>;
      }
      return <CategoryList categoryList={useCategoryList} openCategory={openCategoryId} my={false} type="use" />;
    }
    if (type === 'provide') {
      if (provideCategoryList === undefined) {
        return <PageLoading />;
      }
      if (provideCategoryList.length === 0) {
        return <div className="my-5 textSecondary text-sm">제공 중인 API가 없습니다.</div>;
      }
      return (
        <CategoryList categoryList={provideCategoryList} openCategory={openCategoryId} my={false} type="provide" />
      );
    }
    if (type === 'admin') {
      if (categoryList === undefined) {
        return <PageLoading />;
      }
      if (categoryList.length === 0) {
        return <div className="my-5 textSecondary text-sm">API가 없습니다.</div>;
      }
      return <CategoryList categoryList={categoryList} openCategory={openCategoryId} my={false} type="admin" />;
    }
    return null;
  };

  return (
    <div className="pr-2 pl-1">
      {type !== 'admin' && (
        <div className="bg-gray-100 flex p-1 rounded-lg justify-center w-full mt-5">
          <Chip
            size="lg"
            radius="sm"
            onClick={() => router.push(`/statistics/category/use/${firstUseCategoryId}`)}
            className={`text-sm font-bold cursor-pointer w-1/2 text-center ${
              type === 'use' ? 'bg-white text-black border' : 'bg-gray-100 text-gray-400'
            } ${styles.chip}`}
          >
            사용
          </Chip>
          <Chip
            onClick={() => router.push(`/statistics/category/provide/${firstProvideCategoryId}`)}
            size="lg"
            radius="sm"
            className={`text-sm text-black font-bold cursor-pointer w-1/2 text-center ${
              type === 'provide' ? 'bg-white text-black border' : 'bg-gray-100 text-gray-400'
            } ${styles.chip}`}
          >
            제공
          </Chip>
        </div>
      )}
      <div className={`my-5 px-3 flex flex-col ${styles.ChartSideBarBody}`}>{sideBarBody()}</div>
    </div>
  );
}

export default ChartSideBar;
