import React from 'react';
// import NavBar from '@/components/organisms/NavBar';
// import { IUser } from '@/types/User';
import style from './BothLayout.module.scss';

// interface BothLayoutProps {
//   userInfo: IUser | undefined;` `
//   children: React.ReactNode;
// }

/**
 * BothLayout 컴포넌트
 * @param {object} userInfo - 사원 정보
 */

function BothLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className={`${style.page}`}>
      {/* Top NavBar */}
      {children && children[0]}
      <div className={`${style.bottomPage}`}>
        {/* Side NavBar */}
        {children && children[1]}
        {/* Side NavBar 오른쪽 부분 */}
        <div className={`${style.pageContainer}`}>{children && children[2]}</div>
      </div>
    </div>
  );
}

export default BothLayout;
