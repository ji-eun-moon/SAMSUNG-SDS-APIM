import React from 'react';
// import NavBar from '@/components/organisms/NavBar';
// import { IUser } from '@/types/User';
import style from './TopLayout.module.scss';

// interface TopLayoutProps {
//   userInfo: IUser | undefined;
//   children: React.ReactNode;
// }

/**
 * TopLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function TopLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className={`${style.page}`}>
      {/* Top NavBar */}
      {children && children[0]}
      <div className={`${style.pageContainer}`}>{children && children[1]}</div>
    </div>
  );
}

export default TopLayout;
