import React from 'react';
import useUserStore from '@/store/useUserStore';
import useUrl from '@/hooks/useUrl';
import Link from 'next/link';
// import BorderCard from '../BorderCard';
import styles from '@/components/organisms/UserMainBox/UserMainBox.module.scss';
import ShadowCard from '../ShadowCard';

function UserShortCuts() {
  const { selectedTeam } = useUserStore();
  const { userStatisticsUrl, categoryUrl } = useUrl(selectedTeam);
  return (
    <div className="mb-3">
      <div className="flex gap-2">
        <Link href={categoryUrl}>
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span>API 목록</span>
            </div>
          </ShadowCard>
        </Link>
        <Link href="/team/token">
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span>팀 토큰</span>
            </div>
          </ShadowCard>
        </Link>

        <Link href={userStatisticsUrl}>
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
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
              <span>통계</span>
            </div>
          </ShadowCard>
        </Link>
        <Link href="/apply/use/list">
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
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
              <span>신청내역</span>
            </div>
          </ShadowCard>
        </Link>
      </div>
    </div>
  );
}

export default UserShortCuts;
