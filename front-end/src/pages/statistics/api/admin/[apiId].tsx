import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import DrawerLayout from '@/components/templates/DrawerLayout';
import ChartLayout from '@/components/templates/ChartLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import Usage from '@/components/organisms/statistics/Usage';
import ResponseTime from '@/components/organisms/statistics/ResponseTime';
import ResponseCode from '@/components/organisms/statistics/ResponseCode';
import { getCategoryList, getApiName } from '@/utils/axios/api';
import {
  getMonthlyUsage,
  getDailyUsage,
  getHourlyUsage,
  getResponseTime,
  getResponseCode,
} from '@/utils/axios/statistics';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { IApi, IApiName, ICategory } from '@/types/Api';
import GoBack from '@/components/atoms/GoBack';
import Link from 'next/link';

type SSGProps = {
  apiId: number;
};

const AdminApiChart: NextPage<SSGProps> = ({ apiId }: SSGProps) => {
  const { data } = useQuery<IApiName>(['apiName', apiId], () => getApiName(apiId), {
    enabled: apiId !== 0,
  });

  return (
    <DrawerLayout>
      <ChartSideBar type="admin" openCategoryId={data?.categoryId || 0} />
      {apiId === 0 ? (
        <div className="flex w-full justify-center my-80">API가 없습니다.</div>
      ) : (
        <ChartLayout>
          <div className="flex justify-between">
            <GoBack label={data?.apiName || ''} />
            <Link href={`/apis/detail/${apiId}`}>
              <div className="underline cursor-pointer">API 상세 보기</div>
            </Link>
          </div>
          {/* 사용량 */}
          <Usage apiId={apiId} teamName="admin" type="provide" />
          {/* 응답시간 */}
          <ResponseTime apiId={apiId} teamName="admin" type="provide" />
          {/* 응답코드 */}
          <ResponseCode apiId={apiId} teamName="admin" type="provide" />
        </ChartLayout>
      )}
    </DrawerLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryList = await getCategoryList();
  const paths =
    categoryList?.flatMap((category: ICategory) =>
      category.apiList.map((api: IApi) => ({
        params: { apiId: api.apiId.toString() },
      })),
    ) || [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiId = Number(params?.apiId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['apiName', apiId], () => getApiName(apiId));
  await queryClient.prefetchQuery([`monthlyUsage`, { apiId, teamName: 'admin', type: 'provide' }], () =>
    getMonthlyUsage({ apiId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`dailyUsage`, { apiId, teamName: 'admin', type: 'provide' }], () =>
    getDailyUsage({ apiId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`hourlyUsage`, { apiId, teamName: 'admin', type: 'provide' }], () =>
    getHourlyUsage({ apiId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseTime`, { apiId, teamName: 'admin', type: 'provide' }], () =>
    getResponseTime({ apiId, teamName: 'admin', type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseCode`, { apiId, teamName: 'admin', type: 'provide' }], () =>
    getResponseCode({ apiId, teamName: 'admin', type: 'provide' }),
  );
  return {
    props: { apiId, dehydratedState: dehydrate(queryClient) },
  };
};

export default AdminApiChart;
