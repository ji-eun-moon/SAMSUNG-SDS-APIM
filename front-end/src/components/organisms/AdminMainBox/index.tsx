// API 전체 목록
// API 상태
// 신청내역
// 팀관리
// 서버 모니터링(새 페이지로)
// 사용량 모니터링

import React from 'react';
import useUrl from '@/hooks/useUrl';
import ShadowCard from '@/components/atoms/ShadowCard';
import { useRouter } from 'next/router';
import ServerGraph from '@/components/atoms/ServerGraph';
import Link from 'next/link';
import Image from 'next/image';
import style from './AdminMain.module.scss';

function AdminMainBox() {
  const router = useRouter();
  const { adminStatisticsUrl, categoryUrl } = useUrl('admin');

  const src = {
    CpuUsage: 'panelId=95',

    WarnLogCount: {
      src: 'https://k9c201.p.ssafy.io/grafana/d-solo/b4d29df7-664b-4ea1-82ba-022f535c0356/error-log?orgId=1',
      panelId: 'panelId=3',
    },
    WarnLogs: {
      src: 'https://k9c201.p.ssafy.io/grafana/d-solo/b4d29df7-664b-4ea1-82ba-022f535c0356/error-log?orgId=1',
      panelId: 'panelId=2',
    },
  };

  const urlList = {
    ApiStatus: `/apis/status`,
    adminApplyList: '/admin/useApplyList',
    memberList: `/member/list`,
    servermonitoring: '/monitoring/server',
    usagemonitoring: '/monitoring/usage',
  };

  return (
    <div className="px-8 py-3 w-full h-full" style={{ paddingTop: '50px' }}>
      <div className="items-baseline w-full h-full">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', gap: '10px', width: '50%', marginBottom: '10px' }}>
            <ShadowCard type="button" onClickHandler={() => router.push(categoryUrl)}>
              <div className={style.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                  />
                </svg>
                <span>API 목록</span>
              </div>
            </ShadowCard>
            <ShadowCard type="button" onClickHandler={() => router.push(urlList.ApiStatus)}>
              <div className={style.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>{' '}
                <span>API 상태</span>
              </div>
            </ShadowCard>
            <ShadowCard type="button" onClickHandler={() => router.push(urlList.adminApplyList)}>
              <div className={style.shortcut}>
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
                <span>신청 내역</span>
              </div>
            </ShadowCard>
            <ShadowCard type="button" onClickHandler={() => router.push(urlList.memberList)}>
              <div className={style.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 18"
                >
                  <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span>사원 관리</span>
              </div>
            </ShadowCard>
            <ShadowCard type="button" onClickHandler={() => router.push(adminStatisticsUrl)}>
              <div className={style.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-600 dark:text-white"
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
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              gap: '10px',
              width: '27%',
              marginBottom: '10px',
              paddingRight: '7px',
            }}
          >
            <Link href="/monitoring/server" target="_blank">
              <ShadowCard type="monitoring" border="3px solid #17468f">
                <div className={style.shortcut}>
                  <Image src="/images/desktop.png" alt="itda logo" width={22} height={22} />
                  <span>서버 모니터링</span>
                </div>
              </ShadowCard>
            </Link>

            <Link href="/monitoring/usage" target="_blank">
              <ShadowCard type="monitoring" border="3px solid #17468f">
                <div className={style.shortcut}>
                  <Image src="/images/database.png" alt="itda logo" width={22} height={22} />

                  <span>사용량 모니터링</span>
                </div>
              </ShadowCard>
            </Link>
          </div>
        </div>

        <div className={`${style.bottom}`}>
          <div style={{ height: '100%' }} className={`${style.left}`}>
            <ShadowCard type="small">
              <div style={{ height: '100%' }}>
                <ServerGraph src={src.WarnLogCount.src} panelId={src.WarnLogCount.panelId} from="now-1h" />
              </div>
            </ShadowCard>

            <ShadowCard type="small">
              <div style={{ height: '100%' }}>
                <ServerGraph src={src.WarnLogs.src} panelId={src.WarnLogs.panelId} from="now-1h" />
              </div>
            </ShadowCard>

            <ShadowCard type="small">
              <div style={{ height: '100%' }}>
                <ServerGraph src={src.CpuUsage} from="5m" />
              </div>
            </ShadowCard>
          </div>
          <div className={`${style.showGraph2}`}>
            <iframe
              src="https://k9c201.p.ssafy.io/kibana/app/dashboards#/view/ce31a490-82b7-11ee-b5b1-05720a5cfdb7?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:3000),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'30minute-usage',viewMode:view)"
              height="100%"
              width="100%"
              title="usage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMainBox;
