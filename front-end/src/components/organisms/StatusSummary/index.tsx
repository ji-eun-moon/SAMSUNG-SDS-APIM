import ShadowCard from '@/components/atoms/ShadowCard';
import style from '@/styles/MainPage.module.scss';

function StatusSummary() {
  return (
    <div>
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>API 상태 확인</span>
        <span className={style.goDetail}>
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
        </span>
      </div>
      <div className={`${style.thirdPart}`}>
        <ShadowCard type="small">
          <div className={style.contents}>
            <div className={style.thirdContent}>
              <div className={style.thirdInContent} style={{ justifyContent: 'start', paddingLeft: '30px' }}>
                잔액 조회 API
              </div>
              <span className={style.thirdInContent}>🟢정상</span>
              <span className={style.thirdInContent}>|</span>
              <span className={style.thirdInContent}>2738ms</span>
              <span className={style.thirdInContent}>|</span>
              <span className={style.thirdInContent}>2023-10-16 08:15:25</span>
            </div>
            <div className={style.thirdContent}>
              <div className={style.thirdInContent} style={{ justifyContent: 'start', paddingLeft: '30px' }}>
                계좌 실행 조회 API
              </div>
              <span className={style.thirdInContent}>🔴오류</span>
              <span className={style.thirdInContent}>|</span>
              <span className={style.thirdInContent}>2738ms</span>
              <span className={style.thirdInContent}>|</span>
              <span className={style.thirdInContent}>2023-10-16 08:15:25</span>
            </div>
          </div>
        </ShadowCard>
      </div>
    </div>
  );
}

export default StatusSummary;
