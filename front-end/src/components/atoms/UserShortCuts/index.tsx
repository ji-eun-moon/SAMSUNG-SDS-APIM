import React from 'react';
import Link from 'next/link';
import BorderCard from '../BorderCard';
// import styles from './UserShortCuts.module.scss';

function UserShortCuts() {
  return (
    <div className="w-2/5">
      <div className="flex items-center pb-1">
        <svg
          className="w-4 h-4 mr-1 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
          style={{ color: '#9a9a9a' }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6.143 1H1.857A.857.857 0 0 0 1 1.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 7 6.143V1.857A.857.857 0 0 0 6.143 1Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 17 6.143V1.857A.857.857 0 0 0 16.143 1Zm-10 10H1.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 7 16.143v-4.286A.857.857 0 0 0 6.143 11Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
          />
        </svg>
        <div className="samsungLogo">바로가기</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-1/2">
            <Link href="/api/category/1">
              <BorderCard>
                <div className="flex flex-col items-center w-full">
                  <svg
                    className="w-14 h-14 m-1 text-gray-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <div className="pt-2">API 목록</div>
                </div>
              </BorderCard>
            </Link>
          </div>
          <div className="w-1/2">
            <Link href="/team">
              <BorderCard>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-14 h-14 m-1 text-gray-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <div className="pt-2">팀 토큰</div>
                </div>
              </BorderCard>
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <Link href="/statistics">
              <BorderCard>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-14 h-14 m-1 text-gray-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                    />
                  </svg>
                  <div className="pt-2">통계</div>
                </div>
              </BorderCard>
            </Link>
          </div>
          <div className="w-1/2">
            <Link href="/apply/use/list">
              <BorderCard>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-14 h-14 m-1 text-gray-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"
                    />
                  </svg>
                  <div className="pt-2">신청내역</div>
                </div>
              </BorderCard>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserShortCuts;
