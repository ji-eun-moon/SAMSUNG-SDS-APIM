import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import ChartLayout from '@/components/templates/ChartLayout';
import DrawerLayout from '@/components/templates/DrawerLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import Usage from '@/components/organisms/statistics/Usage';
import ResponseTime from '@/components/organisms/statistics/ResponseTime';
import ResponseCode from '@/components/organisms/statistics/ResponseCode';
import useUserStore, { getSelectedTeam } from '@/store/useUserStore';
import { getUseCategoryList, getApiName } from '@/utils/axios/api';
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

const UseApiChart: NextPage<SSGProps> = ({ apiId }: SSGProps) => {
  const { selectedTeam } = useUserStore();
  const { data } = useQuery<IApiName>(['apiName', apiId], async () => getApiName(apiId), {
    enabled: apiId !== 0,
  });

  // if (isLoading || !data) {
  //   return <PageLoading />;
  // }

  return (
    <DrawerLayout>
      <ChartSideBar type="use" openCategoryId={data?.categoryId || 0} />
      {apiId === 0 ? (
        <div className="flex w-full justify-center my-80">사용 중인 API가 없습니다.</div>
      ) : (
        <ChartLayout>
          <div className="flex justify-between">
            <GoBack label={data?.apiName || ''} />
            <Link href={`/apis/detail/${apiId}`}>
              <div className="underline cursor-pointer">API 상세 보기</div>
            </Link>
          </div>
          {/* 사용량 */}
          <Usage apiId={apiId} teamName={selectedTeam} type="use" />
          {/* 응답시간 */}
          <ResponseTime apiId={apiId} teamName={selectedTeam} type="use" />
          {/* 응답코드 */}
          <ResponseCode apiId={apiId} teamName={selectedTeam} type="use" />
        </ChartLayout>
      )}
    </DrawerLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const selectedTeam = await getSelectedTeam();
  const useCategoryList = await getUseCategoryList(selectedTeam);
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
  await queryClient.prefetchQuery([`monthlyUsage`, { apiId, teamName: selectedTeam, type: 'use' }], () =>
    getMonthlyUsage({ apiId, teamName: selectedTeam, type: 'use' }),
  );
  await queryClient.prefetchQuery([`dailyUsage`, { apiId, teamName: selectedTeam, type: 'use' }], () =>
    getDailyUsage({ apiId, teamName: selectedTeam, type: 'use' }),
  );
  await queryClient.prefetchQuery([`hourlyUsage`, { apiId, teamName: selectedTeam, type: 'use' }], () =>
    getHourlyUsage({ apiId, teamName: selectedTeam, type: 'use' }),
  );
  await queryClient.prefetchQuery([`responseTime`, { apiId, teamName: selectedTeam, type: 'use' }], () =>
    getResponseTime({ apiId, teamName: selectedTeam, type: 'use' }),
  );
  await queryClient.prefetchQuery([`responseCode`, { apiId, teamName: selectedTeam, type: 'use' }], () =>
    getResponseCode({ apiId, teamName: selectedTeam, type: 'use' }),
  );
  return {
    props: { apiId, dehydratedState: dehydrate(queryClient) },
  };
};

export default UseApiChart;
