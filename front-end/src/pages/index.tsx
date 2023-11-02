import React from 'react';
import style from '@/styles/MainPage.module.scss';
import SideLayout from '@/components/templates/SideLayout';
import ShortCuts from '@/components/organisms/ShortCuts';
import ApplySummary from '@/components/organisms/ApplySummary';
import StatusSummary from '@/components/organisms/StatusSummary';
import { NextPage, GetServerSideProps } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getCategoryList } from '@/utils/axios/api';

const Home: NextPage = () => (
  <main>
    <SideLayout>
      <div className={`${style.pageContainer}`}>
        {/* 바로가기 탭 */}
        <ShortCuts />
        {/* API 신청 내역 */}
        <ApplySummary />
        {/* API 상태 */}
        <StatusSummary />
      </div>
    </SideLayout>
  </main>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  await queryClient.prefetchQuery('categoryList', getCategoryList);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
