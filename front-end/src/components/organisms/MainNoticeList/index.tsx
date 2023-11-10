import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getReceiveList } from '@/utils/axios/notice';
import { TNoticeList } from '@/types/Notice';
import MainNotice from '@/components/atoms/MainNotice';
import BorderCard from '@/components/atoms/BorderCard';
import style from './MainNotice.module.scss';

function MainNoticeList() {
  const router = useRouter();
  const { data: noticeList } = useQuery<TNoticeList>('noticeList', async () => {
    const result = await getReceiveList({ page: 0, size: 8 });
    return result;
  });

  if (noticeList === undefined) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center pb-1">
          <svg
            className="w-5 h-5 mr-1 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
            style={{ color: '#9a9a9a' }}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"
            />
          </svg>
          알림 확인하기
        </div>
        <button type="button" className={style.goDetail} onClick={() => router.push('/notice/receive')}>
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
      <BorderCard>
        <div className="h-56">
          {noticeList && noticeList.content.length !== 0 ? (
            noticeList.content?.map((notice, index) => (
              <div key={notice.noticeId}>
                <MainNotice notice={notice} />
                {noticeList && index !== noticeList.content.length - 1 && (
                  <hr style={{ marginTop: '4px', marginBottom: '4px' }} />
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">쪽지가 없습니다</div>
          )}
        </div>
      </BorderCard>
    </div>
  );
}

export default MainNoticeList;
