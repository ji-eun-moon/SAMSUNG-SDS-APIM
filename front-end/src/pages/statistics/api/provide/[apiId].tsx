import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import ChartLayout from '@/components/templates/ChartLayout';
import DrawerLayout from '@/components/templates/DrawerLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import Usage from '@/components/organisms/statistics/Usage';
import ResponseTime from '@/components/organisms/statistics/ResponseTime';
import ResponseCode from '@/components/organisms/statistics/ResponseCode';
import useUserStore, { getSelectedTeam } from '@/store/useUserStore';
import { getProvideCategoryList, getApiName } from '@/utils/axios/api';
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
import PageLoading from '@/components/atoms/PageLoading';
import GoBack from '@/components/atoms/GoBack';
import Link from 'next/link';

type SSGProps = {
  apiId: number;
};

const ProvideApiChart: NextPage<SSGProps> = ({ apiId }: SSGProps) => {
  const { selectedTeam } = useUserStore();
  const { data, isLoading } = useQuery<IApiName>(['apiName', apiId], () => getApiName(apiId));

  if (isLoading || !data) {
    return <PageLoading />;
  }

  return (
    <DrawerLayout>
      <ChartSideBar type="provide" openCategoryId={data.categoryId} />
      {apiId === 0 ? (
        <div className="flex w-full justify-center my-80">제공 중인 API가 없습니다.</div>
      ) : (
        <ChartLayout>
          <div className="flex justify-between">
            <GoBack label={data.apiName} />
            <Link href={`/apis/detail/${apiId}`}>
              <div className="underline cursor-pointer">API 상세 보기</div>
            </Link>
          </div>
          {/* 사용량 */}
          <Usage apiId={apiId} teamName={selectedTeam} type="provide" />
          {/* 응답시간 */}
          <ResponseTime apiId={apiId} teamName={selectedTeam} type="provide" />
          {/* 응답코드 */}
          <ResponseCode apiId={apiId} teamName={selectedTeam} type="provide" />
        </ChartLayout>
      )}
    </DrawerLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const selectedTeam = await getSelectedTeam();
  const useCategoryList = await getProvideCategoryList(selectedTeam);
  const paths =
    useCategoryList?.flatMap((category: ICategory) =>
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
  const selectedTeam = await getSelectedTeam();
  const apiId = Number(params?.apiId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['apiName', apiId], () => getApiName(apiId));
  await queryClient.prefetchQuery([`monthlyUsage`, { apiId, teamName: selectedTeam, type: 'provide' }], () =>
    getMonthlyUsage({ apiId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`dailyUsage`, { apiId, teamName: selectedTeam, type: 'provide' }], () =>
    getDailyUsage({ apiId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`hourlyUsage`, { apiId, teamName: selectedTeam, type: 'provide' }], () =>
    getHourlyUsage({ apiId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseTime`, { apiId, teamName: selectedTeam, type: 'provide' }], () =>
    getResponseTime({ apiId, teamName: selectedTeam, type: 'provide' }),
  );
  await queryClient.prefetchQuery([`responseCode`, { apiId, teamName: selectedTeam, type: 'provide' }], () =>
    getResponseCode({ apiId, teamName: selectedTeam, type: 'provide' }),
  );
  return {
    props: { apiId, dehydratedState: dehydrate(queryClient) },
  };
};

export default ProvideApiChart;
