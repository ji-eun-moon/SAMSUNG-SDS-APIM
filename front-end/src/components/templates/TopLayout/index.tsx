import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import style from './TopLayout.module.scss';

/**
 * TopLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function TopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${style.page}`}>
      {/* Top NavBar */}
      <NavBar position="top" />
      <div className={`${style.pageContainer}`}>{children}</div>
    </div>
  );
}

export default TopLayout;
