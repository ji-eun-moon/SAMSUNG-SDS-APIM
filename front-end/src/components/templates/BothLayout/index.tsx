import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import style from './BothLayout.module.scss';

/**
 * BothLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function BothLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div>
      {/* Top NavBar */}
      <NavBar position="top" />
      <div className="flex" style={{ height: '100vh' }}>
        {/* Side NavBar */}
        <div className={style.sideBar}>{children && children[0]}</div>
        {/* Page Content */}
        <div className={style.pageContent}>{children && children[1]}</div>
      </div>
    </div>
  );
}

export default BothLayout;
