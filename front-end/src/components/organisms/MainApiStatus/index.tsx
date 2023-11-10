import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { IApiStatusInfo } from '@/types/Api';
import { getApiStatus } from '@/utils/axios/api';
import { QueryClient, useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import BorderCard from '@/components/atoms/BorderCard';
// import ShadowCard from '@/components/atoms/ShadowCard';
import Status from '@/components/atoms/Status';
import ApiStatusSummary from '@/components/organisms/ApiStatusSummary';
import style from './MainApiStatus.module.scss';

function MainApiStatus() {
  const [mainApiStatus, setMainApiStatus] = useState<IApiStatusInfo | null>(null);
  const router = useRouter();
  const { data: apiStatusList } = useQuery<IApiStatusInfo>('apiStatuslist 전체', async () => {
    const res = await getApiStatus({ status: '', page: 0, size: 6, apiName: '' });
    setMainApiStatus(res);
    return res;
  });

  const onClickHandler = async (item: string) => {
    if (item === '전체') {
      const result = await getApiStatus({ status: '', page: 0, size: 6, apiName: '' });
      setMainApiStatus(result);
      console.log(result.content);
    }
    if (item === '정상') {
      const result = await getApiStatus({ status: '정상', page: 0, size: 6, apiName: '' });
      setMainApiStatus(result);
    }
    if (item === '오류') {
      const result = await getApiStatus({ status: '오류', page: 0, size: 6, apiName: '' });
      setMainApiStatus(result);
    }
    if (item === '점검') {
      const result = await await getApiStatus({ status: '점검', page: 0, size: 6, apiName: '' });
      setMainApiStatus(result);
    }
  };

  if (apiStatusList === undefined) {
    return null;
  }

  return (
    <div className="w-4/5">
      <div className="flex justify-between">
        <div className="flex items-center pb-1">
          <svg
            className="w-4 h-4 mr-1 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 22"
            style={{ color: '#9a9a9a' }}
          >
            <path d="M15.458 4a3 3 0 1 0-4.478 2.6A2.6 2.6 0 0 1 8.4 9H6.6a4.57 4.57 0 0 0-2.6.814v-3a3 3 0 1 0-2 0v8.368a3 3 0 1 0 2 0V13.6A2.607 2.607 0 0 1 6.6 11h1.8a4.6 4.6 0 0 0 4.548-4.049A3 3 0 0 0 15.458 4Z" />
          </svg>
          <div className="samsungLogo">API 상태 확인</div>
        </div>
        <button type="button" className={style.goDetail} onClick={() => router.push('/apis/status')}>
          상세보기
          <svg
            className="w-3 h-3 pl-2 text-gray-500 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </button>
      </div>
      {/* <ShadowCard type="bordersmall" bgcolor="#ffffff"> */}
      <BorderCard>
        <div className="min-h-max">
          <ApiStatusSummary />
          <div className="w-full flex gap-2 justify-end text-sm">
            <button type="button" onClick={() => onClickHandler('전체')}>
              전체
            </button>
            <button type="button" onClick={() => onClickHandler('정상')}>
              정상
            </button>
            <button type="button" onClick={() => onClickHandler('점검')}>
              점검
            </button>
            <button type="button" onClick={() => onClickHandler('오류')}>
              오류
            </button>
          </div>
          <div className="p-3">
            {mainApiStatus && mainApiStatus.content.length !== 0 ? (
              mainApiStatus.content?.map((item, index) => (
                <div key={item.apiId} className="flex justify-between itdaText text-sm">
                  <div className="flex w-4/5 items-center gap-2">
                    <Status status={item.apiStatus} size="small" />
                    <div className="text-start">{item.apiName}</div>
                  </div>
                  <div className="w-full flex justify-end">{item.responseTime}ms</div>
                  {index !== mainApiStatus.content.length - 1 && (
                    <hr style={{ marginTop: '4px', marginBottom: '4px' }} />
                  )}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">해당 API가 없습니다</div>
            )}
          </div>
        </div>
      </BorderCard>
      {/* </ShadowCard> */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('allApiStatus', () => getApiStatus({ status: '', page: 0, size: 3, apiName: '' }));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MainApiStatus;
