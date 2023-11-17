import style from '@/styles/MainPage.module.scss';
import ShadowCard from '@/components/atoms/ShadowCard';
import useUserStore from '@/store/useUserStore';
import Carousel from '@/components/atoms/Carousel';
import { useRouter } from 'next/router';

interface ApplySummaryProps {
  type: string;
  bodyContent: React.ReactNode;
}

function ApplySummary({ type, bodyContent }: ApplySummaryProps) {
  const router = useRouter();

  const { selectedTeam } = useUserStore();

  return (
    <div>
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>
          <span className="itdaBlue">{selectedTeam}</span>
          &nbsp; 팀의 {type === '사용' ? '사용' : '제공'} 신청목록
        </span>
        <button
          type="button"
          className={style.goDetail}
          onClick={() => router.push(type === '사용' ? '/apply/use/list' : 'apply/provide/list')}
        >
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
      <div className={`${style.secondPart}`}>
        <ShadowCard type="bordersmall" bgcolor="#ffffff">
          <Carousel>{bodyContent}</Carousel>
        </ShadowCard>
      </div>
    </div>
  );
}

export default ApplySummary;
