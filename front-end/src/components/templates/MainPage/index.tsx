import React from 'react';
import { IUser } from '@/types/User';
import ShadowCard from '@/components/atoms/ShadowCard';
import Image from 'next/image';
import SideLayout from '../SideLayout';
import style from './MainPage.module.scss';

interface MainPageProps {
  userInfo: IUser | undefined;
}

/**
 * MainPage 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

const firstPart = () => (
  <div>
    <p className={style.partTitle}>바로가기</p>
    <div className={`${style.firstPart}`}>
      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/myAPI.png" alt="next-icon" width={10} height={10} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>나의 API</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/chart.png" alt="next-icon" width={10} height={10} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>통계</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/monitoring.png" alt="next-icon" width={10} height={10} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>서버 모니터링</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/applyList.png" alt="next-icon" width={10} height={10} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>신청내역</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/APIList.png" alt="next-icon" width={10} height={10} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>API 목록</p>
      </div>
    </div>
  </div>
);

const secondPart = () => (
  <div>
    <p className={style.partTitle}>
      <span className="itdaBlue">김사원</span>님의 신청목록
    </p>
    <div className={`${style.secondPart}`}>
      <ShadowCard type="small">
        <div className={style.contents}>
          <div className={style.secondContent}>
            <div
              className={style.secondInContent}
              style={{ backgroundColor: '#D9D9D9', color: '#ffffff', borderRadius: '5px' }}
            >
              제공
            </div>
            <span className={style.secondInContent} style={{ justifyContent: 'start', paddingLeft: '30px' }}>
              자동차 번호 조회 API 제공 신청
            </span>
            <span className={style.secondInContent}>진행</span>
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

const thirdPart = () => (
  <div>
    <p className={style.partTitle}>API 상태확인</p>
    <div className={`${style.thirdPart}`}>
      <ShadowCard type="small">
        <div className={style.contents}>
          <div className={style.thirdContent}>
            <div className={style.thirdInContent} style={{ justifyContent: 'start', paddingLeft: '30px' }}>
              잔액 조회 API
            </div>
            <span className={style.thirdInContent}>🟢정상</span>
            <span className={style.thirdInContent}>2738MS</span>
            <span className={style.thirdInContent}>|</span>
            <span className={style.thirdInContent}>2023-10-16 08:15:25</span>
          </div>
        </div>
      </ShadowCard>
    </div>
  </div>
);

function MainPage({ userInfo }: MainPageProps) {
  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <SideLayout userInfo={userInfo}>
      <div className={`${style.pageContainer}`}>
        {firstPart()} {secondPart()} {thirdPart()}
      </div>
    </SideLayout>
  );
}

export default MainPage;
