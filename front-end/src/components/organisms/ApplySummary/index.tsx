import style from '@/styles/MainPage.module.scss';
import ShadowCard from '@/components/atoms/ShadowCard';

function ApplySummary() {
  return (
    <div>
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>
          <span className="itdaBlue">김사원</span>님의 신청목록
        </span>
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
      <div className={`${style.secondPart}`}>
        <ShadowCard type="small">
          <div className={style.contents}>
            <div className={style.secondContent}>
              <div
                className={style.secondInContent}
                style={{ backgroundColor: '#D9D9D9', color: '#ffffff', borderRadius: '5px', marginLeft: '8px' }}
              >
                제공
              </div>
              <span className={style.secondInContent} style={{ justifyContent: 'start', paddingLeft: '30px' }}>
                자동차 번호 조회 API 제공 신청
              </span>
              <span className={`${style.secondInContent} itdaBlue`}>진행</span>
              <span className={style.secondInContent}>|</span>
              <span className={style.secondInContent} style={{ paddingRight: '10px' }}>
                2023.10.16
              </span>
            </div>
          </div>
        </ShadowCard>
      </div>
    </div>
  );
}

export default ApplySummary;
