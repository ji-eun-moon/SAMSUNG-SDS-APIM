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
      {/* <NavBar
        position="top"
        userInfo={userInfo}
        noticeCnt="6"
        notices="hi"
        dropDownList={[
          {
            title: '메인',
            icon: 'home',
            onClick: function onClick() {
              // 클릭 시 실행할 동작 정의
            },
          },
          // 다른 항목들 추가
        ]}
      /> */}
      <div className={`${style.bottomPage}`}>
        {/* Side NavBar */}
        {children && children[1]}

        {/* <NavBar
          position="side" // 혹은 "top"
          userInfo={userInfo}
          noticeCnt="6"
          notices=[]
          dropDownList={[
            {
              title: '메인',
              icon: 'home',
              onClick: function onClick() {
                // 클릭 시 실행할 동작 정의
              },
            },
            // 다른 드롭다운 항목들 추가
          ]}
        /> */}
      </div>
    </div>
  );
}

export default BothLayout;
