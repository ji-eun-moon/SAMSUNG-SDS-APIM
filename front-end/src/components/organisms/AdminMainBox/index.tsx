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
    ErrorLogs: 'panelId=10',
    HeapUsed: 'panelId=58',
    NonHeapUsed: 'panelId=60',
    CpuUsage: 'panelId=95',
    ErrorLogsDetail:
      'https://k9c201.p.ssafy.io/grafana/d/b4d29df7-664b-4ea1-82ba-022f535c0356/error-log?orgId=1&from=1699603573167&to=1699625173167&viewPanel=1',
  };

  const urlList = {
    ApiStatus: `/apis/status`,
    adminApplyList: '/admin/useApplyList',
    memberList: `/member/list`,
    servermonitoring: '/monitoring/server',
    usagemonitoring: '/kibana',
  };

  return (
    <div className="px-4 py-3" style={{ position: 'relative' }}>
      <div className="flex justify-between items-center ">
        <div className="items-baseline w-full">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                <ShadowCard type="monitoring" border="2px solid rgba(23, 70, 143, 0.2)">
                  <div className={style.shortcut}>
                    <Image src="/images/desktop.png" alt="itda logo" width={22} height={22} />
                    <span>서버 모니터링</span>
                  </div>
                </ShadowCard>
              </Link>

              <Link href="/monitoring/usage" target="_blank">
                <ShadowCard type="monitoring" border="2px solid rgba(23, 70, 143, 0.2)">
                  <div className={style.shortcut}>
                    <Image src="/images/database.png" alt="itda logo" width={22} height={22} />

                    <span>사용량 모니터링</span>
                  </div>
                </ShadowCard>
              </Link>
            </div>
          </div>

          <div className={`${style.bottom}`}>
            <div className={`${style.showGraph}`}>
              <div className={`${style.showGraph2}`}>
                <div className="flex">
                  <ShadowCard type="small">
                    <ServerGraph src={src.ErrorLogs} from="5m" />
                  </ShadowCard>
                </div>
                <div>
                  <ShadowCard type="small">
                    <ServerGraph src={src.CpuUsage} from="5m" />
                  </ShadowCard>
                </div>
                <div>
                  <ShadowCard type="small">
                    <ServerGraph src={src.HeapUsed} from="1s" />
                  </ShadowCard>
                </div>
                <div>
                  <ShadowCard type="small">
                    <ServerGraph src={src.NonHeapUsed} from="1s" />
                  </ShadowCard>
                </div>
              </div>
              <div className={`${style.showGraph3}`}>
                <ShadowCard type="small">
                  <div>
                    <iframe
                      src="https://k9c201.p.ssafy.io/kibana/app/dashboards#/view/5c853750-8099-11ee-b5b1-05720a5cfdb7?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:1000),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:usage-log,viewMode:view)&hide-filter-bar=true&hideNavBar=true"
                      height="100%"
                      width="100%"
                      title="usageLog"
                    />
                  </div>
                  {/* <iframe
                    src="https://k9c201.p.ssafy.io/kibana/app/dashboards#/view/57bd9f00-7f9a-11ee-9ca5-352b710d4b2c?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:usage-recode,viewMode:view)&hide-filter-bar=true"
                    height="100%"
                    width="100%"
                    title="usageLog"
                  /> */}
                </ShadowCard>
              </div>
            </div>
          </div>
          <div className={`${style.errorLog}`}>
            <ShadowCard type="small">
              <ServerGraph src={src.ErrorLogsDetail} />
            </ShadowCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMainBox;
