import ShadowCard from '@/components/atoms/ShadowCard';
import { IApiStatusList } from '@/types/Api';
import { useRouter } from 'next/router';
import Status from '@/components/atoms/Status';
import style from '@/styles/MainPage.module.scss';

interface StatusSummaryProps {
  statusList: IApiStatusList;
}

function StatusSummary({ statusList }: StatusSummaryProps) {
  const router = useRouter();

  const formatUpdatedAt = (dateString: Date) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>API 상태 확인</span>
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
      <div className={`${style.thirdPart}`}>
        <ShadowCard type="small" bgcolor="#ffffff">
          <div className={style.contents}>
            {statusList?.map((status, index) => (
              <div
                key={status.apiId}
                style={{ margin: '0 5px', padding: index === statusList.length - 1 ? '1px 0' : '' }}
                className={`${style.thirdContent} ${index !== statusList.length - 1 ? style.divider : ''}`}
              >
                <div className={style.thirdInContent} style={{ justifyContent: 'start', paddingLeft: '1px' }}>
                  [{status.categoryName}]&nbsp;{status.apiName}
                </div>
                <span className={style.thirdInContent}>
                  <div className="flex items-center justify-center">
                    <Status status={status.apiStatus} />
                    <div className="ml-2">{status.apiStatus}</div>
                  </div>
                </span>
                {/* <span className={style.thirdInContent}>&nbsp;</span> */}
                <span className={style.thirdInContent}>{status.responseTime}ms</span>
                {/* <span className={style.thirdInContent}>&nbsp;</span> */}
                <span className={style.thirdInContent} style={{ paddingRight: '1px' }}>
                  {formatUpdatedAt(status.updatedAt)}
                </span>
              </div>
            ))}
          </div>
        </ShadowCard>
      </div>
    </div>
  );
}

export default StatusSummary;
