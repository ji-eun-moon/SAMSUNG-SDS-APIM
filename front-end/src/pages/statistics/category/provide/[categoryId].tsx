import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import DrawerLayout from '@/components/templates/DrawerLayout';
import CategoryChartLayout from '@/components/templates/CategoryChartLayout';
import CategoryUsage from '@/components/organisms/statistics/CategoryUsage';
import CategoryListUsage from '@/components/organisms/statistics/CategoryListUsage';
import CategoryResponseCode from '@/components/organisms/statistics/CategoryResponseCode';
import CategoryResponseTime from '@/components/organisms/statistics/CategoryResponseTime';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import useUserStore, { getSelectedTeam } from '@/store/useUserStore';
import { getProvideCategoryList, getCategoryName } from '@/utils/axios/api';
import {
  getCategoryMonthlyUsage,
  getCategoryDailyUsage,
  getCategoryHourlyUsage,
  getCategoryResponseCode,
  getCategoryResponseTime,
} from '@/utils/axios/statistics';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ICategory, ICategoryName } from '@/types/Api';
import GoBack from '@/components/atoms/GoBack';
import PageLoading from '@/components/atoms/PageLoading';

type SSGProps = {
  categoryId: number;
};

const ProvideCategoryChart: NextPage<SSGProps> = ({ categoryId }: SSGProps) => {
  const { selectedTeam } = useUserStore();
  const { data } = useQuery<ICategoryName>(['categoryName', categoryId], () => getCategoryName(categoryId), {
    enabled: categoryId !== 0,
  });

  if (categoryId === 0) {
    return (
      <DrawerLayout>
        <ChartSideBar type="provide" openCategoryId={0} />
        <div className="flex w-full justify-center my-80">제공 중인 API가 없습니다.</div>
      </DrawerLayout>
    );
  }

  if (!data) {
    return <PageLoading />;
  }

  return (
    <DrawerLayout>
      <ChartSideBar type="provide" openCategoryId={data.categoryId} />
      <CategoryChartLayout>
        <GoBack label={data.categoryName} />
        {/* 월 총 사용량 */}
        <CategoryUsage type="provide" categoryId={categoryId} teamName={selectedTeam} />
        {/* 기간별 사용량 */}
        <CategoryListUsage type="provide" categoryId={categoryId} teamName={selectedTeam} />
        {/* 응답 코드 */}
        <CategoryResponseCode type="provide" categoryId={categoryId} teamName={selectedTeam} />
        {/* 응답 시간 */}
        <CategoryResponseTime type="provide" categoryId={categoryId} teamName={selectedTeam} />
      </CategoryChartLayout>
    </DrawerLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const selectedTeam = await getSelectedTeam();
  const useCategoryList = await getProvideCategoryList(selectedTeam);
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
  const selectedTeam = await getSelectedTeam();
  const categoryId = Number(params?.categoryId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categoryName', categoryId], () => getCategoryName(categoryId));
  await queryClient.prefetchQuery([`monthlyUsage`, { categoryId, teamName: selectedTeam, type: 'provide' }], () =>
    getCategoryMonthlyUsage({ categoryId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`dailyUsage`, { categoryId, teamName: selectedTeam, type: 'provide' }], () =>
    getCategoryDailyUsage({ categoryId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`hourlyUsage`, { categoryId, teamName: selectedTeam, type: 'provide' }], () =>
    getCategoryHourlyUsage({ categoryId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseCode`, { categoryId, teamName: selectedTeam, type: 'provide' }], () =>
    getCategoryResponseCode({ categoryId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseTime`, { categoryId, teamName: selectedTeam, type: 'provide' }], () =>
    getCategoryResponseTime({ categoryId, teamName: selectedTeam, type: 'provide' }),
  );
  return {
    props: { categoryId, dehydratedState: dehydrate(queryClient) },
  };
};

export default ProvideCategoryChart;
