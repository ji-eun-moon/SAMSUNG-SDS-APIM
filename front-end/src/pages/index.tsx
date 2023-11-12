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
import { IApiStatusInfo } from '@/types/Api';
import { getNoticeCnt } from '@/utils/axios/notice';
import useUserStore from '@/store/useUserStore';
import { getUseApplyList, getProvideApplyList } from '@/utils/axios/apply';
import { IResponseUse, IResponseProvide } from '@/types/Apply';
import UserMainBox from '@/components/organisms/UserMainBox';
import AdminMainBox from '@/components/organisms/AdminMainBox';

const Home: NextPage = () => {
  const { selectedTeam } = useUserStore();

  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: apiStatus } = useQuery<IApiStatusInfo>('apiStatus', () =>
    getApiStatus({ status: '', page: 0, size: 3, apiName: '' }),
  );

  const { data: responseUse } = useQuery<IResponseUse>(
    [`useApplyList${selectedTeam}`, 0, ''], // 첫 번째 인자는 쿼리 키
    () => getUseApplyList(selectedTeam, 0, ''), // 두 번째 인자는 해당 쿼리에 대한 함수
  );

  const { data: responseProvide } = useQuery<IResponseProvide>(
    [`provideApplyList${selectedTeam}`, 0, ''], // 첫 번째 인자는 쿼리 키
    () => getProvideApplyList(selectedTeam, 0, ''), // 두 번째 인자는 해당 쿼리에 대한 함수
  );

  if (!responseUse) {
    return null;
  }
  if (!responseProvide) {
    return null;
  }

  if (!apiStatus || !userInfo) {
    return <PageLoading />;
  }

  if (userInfo.authority === '관리자') {
    return (
      <main>
        <TopLayout>
          <div className={`${style.mainPageContainer}`}>
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  await queryClient.prefetchQuery('categoryList', getCategoryList);
  await queryClient.prefetchQuery('apiStatusList', () => getApiStatus({ status: '', page: 0, size: 3, apiName: '' }));
  await queryClient.prefetchQuery('noticeCnt', getNoticeCnt);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
