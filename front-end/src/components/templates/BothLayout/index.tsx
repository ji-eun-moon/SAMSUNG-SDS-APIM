import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import { IUser } from '@/types/User';
import style from './BothLayout.module.scss';

interface BothLayoutProps {
  userInfo: IUser | undefined;
  children: React.ReactNode;
}

/**
 * BothLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function BothLayout({ userInfo, children }: BothLayoutProps) {
  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`${style.page}`}>
      <NavBar position="top" userInfo={userInfo} />
      <div className={`${style.bottomPage}`}>
        <NavBar position="side" userInfo={userInfo} />
        {!children ? (
          <div className={`${style.pageContainer}`}>{children}</div>
        ) : (
          <div>Loading Spinner 들어갈 부분...</div>
        )}
      </div>
    </div>
  );
}

export default BothLayout;
