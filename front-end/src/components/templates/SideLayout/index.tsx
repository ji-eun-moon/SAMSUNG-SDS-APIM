import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import style from './SideLayout.module.scss';

function SideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${style.page}`}>
      {/* Side NavBar */}
      <NavBar position="side" />
      {/* Page Content */}
      <div className={`${style.pageContainer}`}>{children}</div>
    </div>
  );
}

export default SideLayout;
