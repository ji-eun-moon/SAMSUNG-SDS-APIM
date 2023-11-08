import React from 'react';
import style from '@/styles/MainPage.module.scss';
import SideLayout from '@/components/templates/SideLayout';
import ShortCuts from '@/components/organisms/ShortCuts';
import ApplySummary from '@/components/organisms/ApplySummary';
import StatusSummary from '@/components/organisms/StatusSummary';
import RealTimeLog from '@/components/organisms/RealTimeLog';
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

const Home: NextPage = () => {
  const { selectedTeam } = useUserStore();

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

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
  const useLists = responseUse.content;
  const provideLists = responseProvide.content;

  console.log('useLists', useLists);
  console.log('provideLists', provideLists);

  const bodyUse = () =>
    useLists.map((item) => (
      <div key={item.useApplyId} className={`${style.secondContent}`}>
        <div className={`${style.secondInContent}`}>
          <span>{item?.categoryName}</span>
          <span>{item?.state}</span>
          <span>|</span>
          <span>{formatDate(item?.createdAt)}</span>
        </div>
      </div>
    ));

  const bodyProvide = () =>
    provideLists.map((item) => (
      <div key={item.provideId} className={`${style.secondContent}`}>
        <div className={`${style.secondInContent}`}>
          <span>{item?.serverName}</span>
          <span>{item?.state}</span>
          <span>|</span>
          <span>{formatDate(item?.createdAt)}</span>
        </div>
      </div>
    ));

  if (!apiStatus || !userInfo) {
    return <PageLoading />;
  }

  return (
    <main>
      <SideLayout>
        <div className={`${style.pageContainer}`}>
          {/* 바로가기 탭 */}
          <ShortCuts />
          <div className={`${style.bottom}`}>
            {/* 관리자 - 실시간 로그 / 일반 - API 신청 내역 */}
            {userInfo.authority === '관리자' ? (
              <RealTimeLog />
            ) : (
              <div style={{ display: 'grid', gridAutoRows: '45% 45%', gap: '35px' }}>
                <ApplySummary type="사용" bodyContent={bodyUse()} />
                <ApplySummary type="제공" bodyContent={bodyProvide()} />
              </div>
            )}
            {/* API 상태 */}
            <StatusSummary statusList={apiStatus.content} />
          </div>
        </div>
      </SideLayout>
    </main>
  );
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
