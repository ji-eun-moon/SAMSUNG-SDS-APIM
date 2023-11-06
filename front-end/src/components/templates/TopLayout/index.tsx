import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import { IUser } from '@/types/User';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/utils/axios/user';
import { getNoticeCnt } from '@/utils/axios/notice';
import style from './TopLayout.module.scss';

/**
 * TopLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function TopLayout({ children }: { children: React.ReactNode }) {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: noticeCnt } = useQuery<number>('noticeCnt', getNoticeCnt);
  // 데이터 요청으로 수정 필요
  const dropDownList = [
    { title: '메인', icon: 'home', onClick: () => {} },
    { title: '통계', icon: 'home', onClick: () => {} },
    { title: '모니터링', icon: 'home', onClick: () => {} },
  ];

  if (!userInfo || noticeCnt === undefined) {
    return null;
  }

  return (
    <div className={`${style.page}`}>
      {/* Top NavBar */}
      <NavBar position="top" userInfo={userInfo} noticeCnt={noticeCnt} notices="메시지" dropDownList={dropDownList} />
      <div className={`${style.pageContainer}`}>{children}</div>
    </div>
  );
}

export default TopLayout;
