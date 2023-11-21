import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import DrawerLayout from '@/components/templates/DrawerLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import GoBack from '@/components/atoms/GoBack';
import CategoryChartLayout from '@/components/templates/CategoryChartLayout';
import CategoryUsage from '@/components/organisms/statistics/CategoryUsage';
import CategoryListUsage from '@/components/organisms/statistics/CategoryListUsage';
import CategoryResponseCode from '@/components/organisms/statistics/CategoryResponseCode';
import CategoryResponseTime from '@/components/organisms/statistics/CategoryResponseTime';
import PageLoading from '@/components/atoms/PageLoading';
import { getCategoryList, getCategoryName } from '@/utils/axios/api';
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

type SSGProps = {
  categoryId: number;
};

const AdminCategoryChart: NextPage<SSGProps> = ({ categoryId }: SSGProps) => {
  const { data, isLoading } = useQuery<ICategoryName>(['categoryName', categoryId], () => getCategoryName(categoryId), {
    enabled: categoryId !== 0,
  });

  if (!data || isLoading) {
    return <PageLoading />;
  }

  return (
    <DrawerLayout>
      <ChartSideBar type="admin" openCategoryId={data?.categoryId || categoryId} />
      {categoryId === 0 ? (
        <div className="flex w-full justify-center my-80">API가 없습니다.</div>
      ) : (
        <div>
          <CategoryChartLayout>
            <GoBack label={data?.categoryName || ''} />
            {/* 월 총 사용량 */}
            <CategoryUsage type="provide" categoryId={categoryId} teamName="admin" />
            {/* 기간별 사용량 */}
            <CategoryListUsage type="provide" categoryId={categoryId} teamName="admin" />
            {/* 응답 코드 */}
            <CategoryResponseCode type="provide" categoryId={categoryId} teamName="admin" />
            {/* 응답 시간 */}
            <CategoryResponseTime type="provide" categoryId={categoryId} teamName="admin" />
          </CategoryChartLayout>
        </div>
      )}
    </DrawerLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryList = await getCategoryList();
  const paths =
    categoryList?.map((category: ICategory) => ({
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
  await queryClient.prefetchQuery([`monthlyUsage`, { categoryId, teamName: 'admin', type: 'provide' }], () =>
    getCategoryMonthlyUsage({ categoryId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`dailyUsage`, { categoryId, teamName: 'admin', type: 'provide' }], () =>
    getCategoryDailyUsage({ categoryId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`hourlyUsage`, { categoryId, teamName: 'admin', type: 'provide' }], () =>
    getCategoryHourlyUsage({ categoryId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseCode`, { categoryId, teamName: 'admin', type: 'provide' }], () =>
    getCategoryResponseCode({ categoryId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseTime`, { categoryId, teamName: 'admin', type: 'provide' }], () =>
    getCategoryResponseTime({ categoryId, teamName: 'admin', type: 'provide' }),
  );
  return {
    props: { categoryId, dehydratedState: dehydrate(queryClient) },
  };
};

export default AdminCategoryChart;
