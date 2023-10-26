import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import { IUserInfo } from '@/types/User';
import style from './TopLayout.module.scss';

interface TopLayoutProps {
  userInfo: IUserInfo | undefined;
  children: React.ReactNode;
}

/**
 * TopLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function TopLayout({ userInfo, children }: TopLayoutProps) {
  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`${style.page}`}>
      <NavBar position="top" userInfo={userInfo} />
      {!children ? (
        <div className={`${style.pageContainer}`}>{children}</div>
      ) : (
        <div>Loading Spinner 들어갈 부분...</div>
      )}
    </div>
  );
}

export default TopLayout;
