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
      <NavBar position="top" />
      <div className={`${style.bottomPage}`}>
        {/* Side NavBar */}
        {children && children[0]}
        {/* Side NavBar 오른쪽 부분 */}
        <div>
          <div className={`${style.pageContainer}`}>{children && children[1]}</div>
        </div>
      </div>
    </div>
  );
}

export default BothLayout;
