import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import styles from './NewNotice.module.scss';

interface INewNotice {
  createdAt: string;
  sender: string;
  message: string;
  title: string;
  content: string;
  noticeNumber: string;
  noticeId: number;
}

function NewNotice() {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');
  const queryClient = useQueryClient();
  const [newNotice, setNewNotice] = useState<INewNotice>();

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

    console.log(eventSource);

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
      queryClient.invalidateQueries('noticeCnt'); // 쪽지수 업데이트
      queryClient.invalidateQueries(['unreadReceiveList', 0]); // 쪽지리스트 업데이트

      // 5초 후에 알림 정보 비우기
      const timer = setTimeout(() => {
        setNewNotice(undefined);
      }, 5000);
      return () => clearTimeout(timer);
    });

    return () => {
      eventSource.close();
      console.log('SSE CLOSED');
    };
    // eslint-disable-next-line
  }, []);

  // if (!newNotice) {
  //   return (
  //     <div className={styles.background}>
  //       <div
  //         aria-hidden
  //         id="toast-simple"
  //         className="flex w-full border border-blue-900 items-center p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow space-x"
  //         role="alert"
  //         onClick={() => router.push(`/notice/receive/`)}
  //       >
  //         <svg
  //           className="w-5 h-5 text-blue-900 dark:text-blue-500 rotate-45"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 18 20"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
  //           />
  //         </svg>
  //         <div>
  //           <div className="ps-4 text-sm font-normal">새로운 메세지가 왔어용</div>
  //           <div className="ps-4 text-sm font-normal">메세지 제목이에용</div>
  //           <div className="ps-4 text-sm font-normal">메세지 내용이에용</div>
  //           <div className="ps-4 text-sm font-normal">보낸 사람</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (!newNotice) {
    return null;
  }

  return (
    <div className={styles.background}>
      <div
        aria-hidden
        id="toast-simple"
        className="flex items-center border border-blue-900 w-full p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
        role="alert"
        onClick={() => router.push(`/notice/receive/${newNotice.noticeId}`)}
      >
        <svg
          className="w-5 h-5 text-blue-900 dark:text-blue-500 rotate-45"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
          />
        </svg>
        <div>
          <div className="ps-4 text-sm font-normal">{newNotice.message}</div>
          <div className="ps-4 text-sm font-normal">{newNotice.title}</div>
          <div className="ps-4 text-sm font-normal">{newNotice.content}</div>
          <div className="ps-4 text-sm font-normal">{newNotice.sender}</div>
        </div>
      </div>
    </div>
  );
}

export default NewNotice;
