import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import { IUser } from '@/types/User';
import style from './SideLayout.module.scss';

interface SideLayoutProps {
  userInfo: IUser | undefined;
  children: React.ReactNode;
}

/**
 * SideLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function SideLayout({ userInfo, children }: SideLayoutProps) {
  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`${style.page}`}>
      <NavBar position="side" userInfo={userInfo} />
      <div className={`${style.pageContainer}`}>{children}</div>

      {/* {!children ? (
        <div className={`${style.pageContainer}`}>{children}</div>
      ) : (
        <div>Loading Spinner 들어갈 부분...</div>
      )} */}
    </div>
  );
}

export default SideLayout;
