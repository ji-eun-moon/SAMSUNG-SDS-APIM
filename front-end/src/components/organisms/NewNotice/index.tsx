import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import ProfileImg from '@/components/atoms/ProfileImg';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { INoticeAdmin } from '@/types/Notice';
import styles from './NewNotice.module.scss';

interface INewNotice {
  createdAt: string;
  sender: string;
  title: string;
  noticeId: number;
  image: string;
}

interface IEmergency {
  categoryName: string;
  apiName: string;
  status: string;
  teamName: string;
}

function NewNotice() {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');
  const queryClient = useQueryClient();
  const [newNotice, setNewNotice] = useState<INewNotice>();
  const [newStatus, setStatus] = useState<IEmergency>();
  const [newApply, setNewApply] = useState<INoticeAdmin>();
  const [animationClass, setAnimationClass] = useState(styles['slide-in']);

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource('https://k9c201.p.ssafy.io/api/member/notice/sse-connect', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Connetction: 'keep-alive',
        Accept: 'text/event-stream',
      },
      heartbeatTimeout: 86400000,
    });

    // eslint-disable-next-line
    eventSource.addEventListener('connect', (event: any) => {
      const { data: receivedConnectData } = event;
      if (receivedConnectData === 'SSE 연결이 완료되었습니다.') {
        console.log('SSE CONNECTED');
      } else {
        console.log(event);
      }
    });

    // eslint-disable-next-line
    eventSource.addEventListener('newNotice', (event: any) => {
      const newNoticeInfo: INewNotice = JSON.parse(event.data);
      setNewNotice(newNoticeInfo);
      setAnimationClass(styles['slide-in']);
      queryClient.invalidateQueries('noticeCnt'); // 쪽지수 업데이트
      queryClient.invalidateQueries('noticeList'); // 쪽지리스트 업데이트
      queryClient.invalidateQueries(['unreadReceiveList', 0]); // 안읽은 쪽지리스트 업데이트

      const slideOutTimer = setTimeout(() => {
        setAnimationClass(styles['slide-out']);

        const clearNoticeTimer = setTimeout(() => {
          setNewNotice(undefined);
        }, 500);

        return () => clearTimeout(clearNoticeTimer);
      }, 5000);

      return () => clearTimeout(slideOutTimer);
    });

    // eslint-disable-next-line
    eventSource.addEventListener('statusChange', (event: any) => {
      const newNoticeInfo: IEmergency = JSON.parse(event.data);
      setStatus(newNoticeInfo);
      setAnimationClass(styles['slide-in']);
      queryClient.invalidateQueries('noticeCnt'); // 쪽지수 업데이트
      queryClient.invalidateQueries('noticeList'); // 쪽지리스트 업데이트
      queryClient.invalidateQueries(['unreadReceiveList']); // 안읽은 쪽지리스트 업데이트
      queryClient.invalidateQueries('apiCount'); // 상태 수 업데이트
      queryClient.invalidateQueries('apiStatuslist 전체'); // 상태 리스트 업데이트
      queryClient.invalidateQueries(['apiStatus']); // 상태 리스트 업데이트

      // 5초 후에 알림 언마운트하고 상태 비우기
      const slideOutTimer = setTimeout(() => {
        setAnimationClass(styles['slide-out']);

        const clearStatusTimer = setTimeout(() => {
          setStatus(undefined);
        }, 500);

        return () => clearTimeout(clearStatusTimer);
      }, 5000);

      return () => clearTimeout(slideOutTimer);
    });

    // eslint-disable-next-line
    eventSource.addEventListener('newApply', (event: any) => {
      const newApplyInfo: INoticeAdmin = JSON.parse(event.data);
      setNewApply(newApplyInfo);
      setAnimationClass(styles['slide-in']);
      queryClient.invalidateQueries('noticeCnt'); // 쪽지수 업데이트
      queryClient.invalidateQueries('noticeList'); // 쪽지리스트 업데이트
      queryClient.invalidateQueries(['unreadReceiveList']); // 안읽은 쪽지리스트 업데이트
      queryClient.invalidateQueries(['provideApplyList']); // 제공 신청 리스트 업데이트
      queryClient.invalidateQueries(['useApplyList']); // 제공 신청 리스트 업데이트

      // 5초 후에 알림 언마운트하고 상태 비우기
      const slideOutTimer = setTimeout(() => {
        setAnimationClass(styles['slide-out']);

        const clearStatusTimer = setTimeout(() => {
          setStatus(undefined);
        }, 500);

        return () => clearTimeout(clearStatusTimer);
      }, 5000);

      return () => clearTimeout(slideOutTimer);
    });

    return () => {
      eventSource.close();
      console.log('SSE CLOSED');
    };
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setAnimationClass(styles['slide-out']);
  };

  if (!newNotice && !newStatus && !newApply) {
    return null;
  }

  if (newNotice) {
    return (
      <div className={`${styles.background} ${animationClass}`}>
        <div
          aria-hidden
          id="toast-notification"
          className="w-full p-4 text-gray-900 bg-white rounded-lg shadow border-2 border-blue-800"
          role="alert"
        >
          <div className="flex items-center mb-3 gap-2 justify-between">
            <div className="flex gap-2">
              <svg
                className="w-6 h-6 text-blue-700 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
              <p className="mb-1 text-base font-semibold text-blue-700 dark:text-white">
                새로운 메시지가 도착했습니다.
              </p>
            </div>
            <div onClick={handleClose} aria-hidden>
              <svg
                className="w-4 h-4 text-gray-400 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </div>
          </div>
          <div
            className="flex items-center"
            onClick={() => router.push(`/notice/receive/${newNotice.noticeId}`)}
            aria-hidden
          >
            <div className="relative inline-block shrink-0">
              <ProfileImg width={40} height={40} src={newNotice.image} />
            </div>
            <div className="ms-3 flex flex-col gap-1">
              <div className="text-base font-semibold dark:text-white">{newNotice.sender}</div>
              <div className="text-base font-normal text-gray-800">{newNotice.title}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (newStatus) {
    return (
      <div className={`${styles.background} ${animationClass}`}>
        <div
          aria-hidden
          id="toast-notification"
          className="w-full p-4 text-gray-900 bg-white rounded-lg shadow border-2 border-yellow-500"
          role="alert"
        >
          <div className="flex items-center mb-3 gap-2 justify-between">
            <div className="flex gap-2">
              <svg
                className="w-6 h-6 text-yellow-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
              <p className="mb-1 text-base font-semibold text-yellow-500 dark:text-white">API 상태 변경 알림</p>
            </div>
            <div onClick={handleClose} aria-hidden>
              <svg
                className="w-4 h-4 text-gray-400 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ms-3 flex flex-col gap-1">
              <div className="text-base font-medium">
                &#91;{newStatus.categoryName}&#93; {newStatus.apiName} 상태가 변경 되었습니다.
              </div>
              <div className="text-base font-normal text-gray-800">상태 : {newStatus.status}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (newApply) {
    return (
      <div className={`${styles.background} ${animationClass}`}>
        <div
          aria-hidden
          id="toast-notification"
          className="w-full p-4 text-gray-900 bg-white rounded-lg shadow border-2 border-green-500"
          role="alert"
        >
          <div className="flex items-center mb-3 gap-2 justify-between">
            <div className="flex gap-2">
              <svg
                className="w-6 h-6 text-green-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
              <p className="mb-1 text-base font-semibold text-green-500 dark:text-white">
                {newApply.applyName} 신청 알림
              </p>
            </div>
            <div onClick={handleClose} aria-hidden>
              <svg
                className="w-4 h-4 text-gray-400 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ms-3 flex flex-col gap-1">
              <div className="text-base font-medium">
                &#91;{newApply.categoryName}&#93; {newApply.applyName} 신청이 등록되었습니다.
              </div>
              <div className="text-base font-normal text-gray-800">신청 팀 : {newApply.teamName}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewNotice;
