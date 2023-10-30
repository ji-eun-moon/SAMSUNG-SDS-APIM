import React from 'react';
// import { IUser } from '@/types/User';
import ShadowCard from '@/components/atoms/ShadowCard';
import Image from 'next/image';
import NavBar from '@/components/organisms/NavBar';
import style from '@/styles/MainPage.module.scss';
import SideLayout from '@/components/templates/SideLayout';

const userInfo = {
  name: '송사원',
  imageUrl: '/images/profileImg.png',
  email: 'abc@naver.com',
  employeeId: '0912280',
  department: 'IT 개발',
  position: '1팀',
  teams: [
    {
      teamName: 'project 1',
      teamId: 1,
      teamCount: 1,
      teamMembers: [
        {
          name: '양시온',
          imageUrl: '/images/user1.png',
          email: 'user1@example.com',
          employeeId: '1001',
          department: 'IT 개발',
          position: '팀원',
        },
        {
          name: '문지은',
          imageUrl: '/images/user2.png',
          email: 'user2@example.com',
          employeeId: '1002',
          department: 'IT 개발',
          position: '팀원',
        },
      ],
    },
  ],
  authority: '일반',
};

const firstPart = () => (
  <div>
    <div className={style.partTop}>
      <span className={`${style.partTitle}`}>바로가기</span>
    </div>
    <div className={`${style.firstPart}`}>
      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/myAPI.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>나의 API</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/chart.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>통계</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/monitoring.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>서버 모니터링</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/applyList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>신청내역</p>
      </div>

      <div className={style.cardContainer}>
        <ShadowCard type="small">
          <div className={style.imgContainer}>
            <Image src="/images/APIList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
          </div>
        </ShadowCard>
        <p className={style.cardtitle}>API 목록</p>
      </div>
    </div>
  </div>
);

const secondPart = () => (
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

const thirdPart = () => (
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

export default function Home() {
  return (
    <main>
      <SideLayout>
        {[
          <NavBar position="side" userInfo={userInfo} noticeCnt="6" />,
          <div className={`${style.pageContainer}`}>
            {firstPart()}
            {secondPart()}
            {thirdPart()}
          </div>,
        ]}
      </SideLayout>
    </main>
  );
}
