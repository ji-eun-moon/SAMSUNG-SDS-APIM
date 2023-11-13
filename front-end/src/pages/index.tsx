import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);

  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: apiStatus } = useQuery<IApiStatusInfo>('apiStatus', () =>
    getApiStatus({ status: '', page: 0, size: 3, apiName: '' }),
  );

  const { data: responseUse } = useQuery<IResponseUse>([`useApplyList${selectedTeam}`, 0, ''], () =>
    getUseApplyList(selectedTeam, 0, ''),
  );

  const { data: responseProvide } = useQuery<IResponseProvide>([`provideApplyList${selectedTeam}`, 0, ''], () =>
    getProvideApplyList(selectedTeam, 0, ''),
  );

  useEffect(() => {
    // Simulate a 2-second delay
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  if (!responseUse || !responseProvide || !apiStatus || !userInfo) {
    return null;
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
