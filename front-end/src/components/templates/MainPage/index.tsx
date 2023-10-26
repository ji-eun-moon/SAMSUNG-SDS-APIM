import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import { IUserInfo } from '@/types/User';
import ShadowCard from '@/components/atoms/ShadowCard';
import style from './MainPage.module.scss';

interface MainPageProps {
  userInfo: IUserInfo | undefined;
}

/**
 * MainPage 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

const firstPart = () => (
  <div>
    <p>바로가기</p>
    <div className={`${style.page}`}>
      <ShadowCard type="small">
        <p>1</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>2</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>3</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>4</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>5</p>
      </ShadowCard>
    </div>
  </div>
);
const secondPart = () => (
  <div>
    <p>김사원님의 신청목록</p>
    <div className={`${style.page}`}>
      <ShadowCard type="small">
        <p>1</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>2</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>3</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>4</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>5</p>
      </ShadowCard>
    </div>
  </div>
);
const thirdPart = () => (
  <div>
    <p>바로가기</p>
    <div className={`${style.page}`}>
      <ShadowCard type="small">
        <p>1</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>2</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>3</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>4</p>
      </ShadowCard>
      <ShadowCard type="small">
        <p>5</p>
      </ShadowCard>
    </div>
  </div>
);

function MainPage({ userInfo }: MainPageProps) {
  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`${style.page}`}>
      <NavBar position="side" userInfo={userInfo} />
      <div className={`${style.pageContainer}`}>
        {firstPart()} {secondPart()} {thirdPart()}
      </div>
    </div>
  );
}

export default MainPage;
