import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IApiStatusInfo } from '@/types/Api';
import { getStatusCount, getApiStatus } from '@/utils/axios/api';
import { QueryClient, useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import ShadowCard from '@/components/atoms/ShadowCard';
import Status from '@/components/atoms/Status';
import ApiStatusSummary from '@/components/organisms/ApiStatusSummary';
import style from './MainApiStatus.module.scss';

interface IApiCount {
  success: number;
  warning: number;
  error: number;
}

function MainApiStatus() {
  const [all, setAll] = useState(0);
  const { data: apiCount } = useQuery<IApiCount>('apiCount', getStatusCount);
  useEffect(() => {
    if (apiCount !== undefined) {
      const successCount = apiCount.success ?? 0;
      const warningCount = apiCount.warning ?? 0;
      const errorCount = apiCount.error ?? 0;

      setAll(successCount + warningCount + errorCount);
    }
  }, [apiCount]);

  const [mainApiStatus, setMainApiStatus] = useState<IApiStatusInfo | null>(null);
  const router = useRouter();
  const { data: apiStatusList } = useQuery<IApiStatusInfo>('apiStatuslist 전체', async () => {
    const res = await getApiStatus({ status: '', page: 0, size: all, apiName: '' });
    setMainApiStatus(res);
    return res;
  });

  const onClickHandler = async (item: string) => {
    if (item === '전체') {
      const result = await getApiStatus({ status: '', page: 0, size: all, apiName: '' });
      setMainApiStatus(result);
      console.log(result.content);
    }
    if (item === '정상') {
      const result = await getApiStatus({ status: '정상', page: 0, size: all, apiName: '' });
      setMainApiStatus(result);
    }
    if (item === '오류') {
      const result = await getApiStatus({ status: '오류', page: 0, size: all, apiName: '' });
      setMainApiStatus(result);
    }
    if (item === '점검') {
      const result = await getApiStatus({ status: '점검', page: 0, size: all, apiName: '' });
      setMainApiStatus(result);
    }
  };

  const truncateText = (text: string) => {
    if (text?.length <= 36) {
      return text;
    }
    return `${text?.substring(0, 36)}...`;
  };

  if (!apiStatusList) {
    return null;
  }

  return (
    <div className="w-4/5">
      <div className="flex justify-between">
        <div className="flex items-center pb-1">
          <svg
            className="w-4 h-4 mx-1 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 22"
            // style={{ color: '#9a9a9a' }}
            style={{ color: '#17468f' }}
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
      <ShadowCard type="bordersmall">
        <div style={{ height: '31vh' }}>
          <ApiStatusSummary onClickHandler={onClickHandler} />
          <div className={`p-3 ${style.scroll}`} style={{ maxHeight: '25vh', overflowY: 'auto' }}>
            {mainApiStatus &&
              mainApiStatus.content.length !== 0 &&
              mainApiStatus.content?.map((item, index) => (
                <div>
                  <div key={item.apiId} className="flex justify-between itdaText text-sm">
                    <div className="flex w-full items-center gap-2">
                      <Status status={item.apiStatus} size="small" />
                      <div className="text-start w-full">{truncateText(item.apiName)}</div>
                    </div>
                    <div className="w-full flex justify-end">{item.responseTime}ms</div>
                  </div>
                  {index !== mainApiStatus.content.length - 1 && (
                    <hr style={{ marginTop: '4px', marginBottom: '4px' }} />
                  )}
                </div>
              ))}
            {mainApiStatus && mainApiStatus.content.length === 0 && (
              <div className={`p-3 ${style.scroll}`} style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                <div className="h-full flex justify-center items-center text-sm itdaText">해당 API가 없습니다</div>
              </div>
            )}
          </div>
        </div>
      </ShadowCard>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('apiCount', getStatusCount);
  await queryClient.prefetchQuery('allApiStatus', () => getApiStatus({ status: '', page: 0, size: 3, apiName: '' }));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MainApiStatus;
