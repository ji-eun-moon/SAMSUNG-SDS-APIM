import React from 'react';
import { IUser } from '@/types/User';
import NavBar from '@/components/organisms/NavBar';
import style from '@/styles/MainPage.module.scss';
import SideLayout from '@/components/templates/SideLayout';
import ShortCuts from '@/components/organisms/ShortCuts';
import ApplySummary from '@/components/organisms/ApplySummary';
import StatusSummary from '@/components/organisms/StatusSummary';
import { NextPage, GetServerSideProps } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getCategoryList } from '@/utils/axios/api';
import { TCategoryList } from '@/types/Api';
import PageLoading from '@/components/atoms/PageLoading';

const Home: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);

  if (!userInfo || !categoryList) {
    return <PageLoading />;
  }

  const firstCategory = categoryList[0].categoryId;

  return (
    <main>
      <SideLayout>
        <NavBar position="side" userInfo={userInfo} noticeCnt="6" firstCategory={firstCategory} />
        <div className={`${style.pageContainer}`}>
          {/* 바로가기 탭 */}
          <ShortCuts firstCategory={firstCategory} />
          {/* API 신청 내역 */}
          <ApplySummary />
          {/* API 상태 */}
          <StatusSummary />
        </div>
      </SideLayout>
    </main>
  );
};

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
