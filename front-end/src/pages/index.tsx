import React from 'react';
import style from '@/styles/MainPage.module.scss';
import SideLayout from '@/components/templates/SideLayout';
import ShortCuts from '@/components/organisms/ShortCuts';
import ApplySummary from '@/components/organisms/ApplySummary';
import StatusSummary from '@/components/organisms/StatusSummary';
import { NextPage, GetServerSideProps } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import PageLoading from '@/components/atoms/PageLoading';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getCategoryList, getApiStatus } from '@/utils/axios/api';
import { IApiStatusInfo } from '@/types/Api';

const Home: NextPage = () => {
  const { data: apiStatus } = useQuery<IApiStatusInfo>('apiStatus', () =>
    getApiStatus({ status: '', page: 0, size: 3 }),
  );

  if (!apiStatus) {
    return <PageLoading />;
  }
  return (
    <main>
      <SideLayout>
        <div className={`${style.pageContainer}`}>
          {/* 바로가기 탭 */}
          <ShortCuts />
          {/* API 신청 내역 */}
          <ApplySummary />
          {/* API 상태 */}
          <StatusSummary statusList={apiStatus.content} />
        </div>
      </SideLayout>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  await queryClient.prefetchQuery('categoryList', getCategoryList);
  await queryClient.prefetchQuery('apiStatusList', () => getApiStatus({ status: '', page: 0, size: 3 }));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
