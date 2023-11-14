import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import DrawerLayout from '@/components/templates/DrawerLayout';
import CategoryChartLayout from '@/components/templates/CategoryChartLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import useUserStore, { getSelectedTeam } from '@/store/useUserStore';
import { getUseCategoryList, getCategoryName } from '@/utils/axios/api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ICategory, ICategoryName } from '@/types/Api';
import GoBack from '@/components/atoms/GoBack';
import CategoryUsage from '@/components/organisms/statistics/CategoryUsage';
import CategoryListUsage from '@/components/organisms/statistics/CategoryListUsage';
import CategoryResponseCode from '@/components/organisms/statistics/CategoryResponseCode';
import CategoryResponseTime from '@/components/organisms/statistics/CategoryResponseTime';
import PageLoading from '@/components/atoms/PageLoading';

type SSGProps = {
  categoryId: number;
};

const UseCategoryChart: NextPage<SSGProps> = ({ categoryId }: SSGProps) => {
  const { selectedTeam } = useUserStore();
  const { data } = useQuery<ICategoryName>(['categoryName', categoryId], () => getCategoryName(categoryId));

  if (!data) {
    return <PageLoading />;
  }

  return (
    <DrawerLayout>
      <ChartSideBar type="use" openCategoryId={data?.categoryId} />
      {categoryId === 0 ? (
        <div className="flex w-full justify-center my-80">사용 중인 API가 없습니다.</div>
      ) : (
        <div>
          <CategoryChartLayout>
            <GoBack label={data?.categoryName} />
            {/* 월 총 사용량 */}
            <CategoryUsage type="use" categoryId={categoryId} teamName={selectedTeam} />
            {/* 기간별 사용량 */}
            <CategoryListUsage type="use" categoryId={categoryId} teamName={selectedTeam} />
            {/* 응답 코드 */}
            <CategoryResponseCode type="use" categoryId={categoryId} teamName={selectedTeam} />
            {/* 응답 시간 */}
            <CategoryResponseTime type="use" categoryId={categoryId} teamName={selectedTeam} />
          </CategoryChartLayout>
        </div>
      )}
    </DrawerLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const selectedTeam = await getSelectedTeam();
  const useCategoryList = await getUseCategoryList(selectedTeam);
  const paths =
    useCategoryList?.map((category: ICategory) => ({
      params: { categoryId: category.categoryId.toString() },
    })) || [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = Number(params?.categoryId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categoryName', categoryId], () => getCategoryName(categoryId));
  return {
    props: { categoryId, dehydratedState: dehydrate(queryClient) },
  };
};

export default UseCategoryChart;
