import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import { IUser } from '@/types/User';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/utils/axios/user';
import style from './BothLayout.module.scss';

/**
 * BothLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function BothLayout({ children }: { children: React.ReactNode[] }) {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  // 데이터 요청으로 수정 필요
  const dropDownList = [
    { title: '메인', icon: 'home', onClick: () => {} },
    { title: '통계', icon: 'home', onClick: () => {} },
    { title: '모니터링', icon: 'home', onClick: () => {} },
  ];

  if (!userInfo) {
    return null;
  }

  return (
    <div className={`${style.page}`}>
      {/* Top NavBar */}
      <NavBar position="top" userInfo={userInfo} noticeCnt="5" notices="메시지" dropDownList={dropDownList} />
      <div className={`${style.bottomPage}`}>
        {/* Side NavBar */}
        {children && children[0]}
        {/* Side NavBar 오른쪽 부분 */}
        <div className={`${style.pageContainer}`}>{children && children[1]}</div>
      </div>
    </div>
  );
}

export default BothLayout;
