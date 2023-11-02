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
<<<<<<< HEAD
import { getApiStatus, getCategoryList } from '@/utils/axios/api';
import { TCategoryList, IApiStatusList } from '@/types/Api';
import PageLoading from '@/components/atoms/PageLoading';

const Home: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  const { data: apiStatus } = useQuery<IApiStatusList>('apiStatus', getApiStatus);

  if (!userInfo || !apiStatus) {
    return <PageLoading />;
  }

  let firstCategory = 0;
  if (categoryList) {
    firstCategory = categoryList[0]?.categoryId || 0;
  }

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
          <StatusSummary statusList={apiStatus} />
        </div>
      </SideLayout>
    </main>
  );
};
=======
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
>>>>>>> 2ffe985768d057a4f4584e49a278e11a810d0928

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  await queryClient.prefetchQuery('categoryList', getCategoryList);
  const apiStatus = await getApiStatus();
  queryClient.setQueryData('apiStatus', apiStatus);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
