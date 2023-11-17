import React from 'react';
import style from '@/styles/MainPage.module.scss';
import SideLayout from '@/components/templates/SideLayout';
import TopLayout from '@/components/templates/TopLayout';
import { NextPage, GetServerSideProps } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import PageLoading from '@/components/atoms/PageLoading';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getCategoryList, getApiStatus } from '@/utils/axios/api';
import { IUser } from '@/types/User';
import { getNoticeCnt, getUnreadReceiveNotice } from '@/utils/axios/notice';
import { getSelectedTeam } from '@/store/useUserStore';
import { getUseApplyList, getProvideApplyList } from '@/utils/axios/apply';
import UserMainBox from '@/components/organisms/UserMainBox';
import AdminMainBox from '@/components/organisms/AdminMainBox';

const Home: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (!userInfo) {
    return <PageLoading />;
  }

  if (userInfo.authority === '관리자') {
    return (
      <main>
        <TopLayout>
          <div className={`${style.topPageContainer}`}>
            <AdminMainBox />
          </div>
        </TopLayout>
      </main>
    );
  }

  if (userInfo.authority === '일반') {
    return (
      <main>
        <SideLayout>
          <div className={`${style.mainPageContainer}`}>
            <UserMainBox />
          </div>
        </SideLayout>
      </main>
    );
  }

  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const selectedTeam = await getSelectedTeam();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  await queryClient.prefetchQuery('categoryList', getCategoryList);
  await queryClient.prefetchQuery('allApiStatus', () => getApiStatus({ status: '', page: 0, size: 3, apiName: '' }));
  await queryClient.prefetchQuery([`provideApplyList${selectedTeam}`, 0, ''], () =>
    getProvideApplyList(selectedTeam, 0, ''),
  );
  await queryClient.prefetchQuery([`useApplyList${selectedTeam}`, 0, ''], () => getUseApplyList(selectedTeam, 0, ''));
  await queryClient.prefetchQuery('noticeCnt', getNoticeCnt);
  await queryClient.prefetchQuery(['unreadReceiveList', 0], () => getUnreadReceiveNotice({ page: 0, size: 5 }));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
