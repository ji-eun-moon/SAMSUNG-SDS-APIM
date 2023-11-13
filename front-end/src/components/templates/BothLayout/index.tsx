import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import style from './BothLayout.module.scss';

/**
 * BothLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function BothLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className={`${style.page}`}>
      {/* Top NavBar */}
      <div style={{ zIndex: '2' }}>
        <NavBar position="top" />
      </div>
      {/* Side NavBar */}
      <div>{children && children[0]}</div>
      <div>
        <div className={`${style.pageContainer}`}>{children && children[1]}</div>
      </div>
    </div>
  );
}

export default BothLayout;
