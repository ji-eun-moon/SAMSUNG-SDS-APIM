import React from 'react';
import NavBar from '@/components/organisms/NavBar';
import { IUser } from '@/types/User';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/utils/axios/user';
import { TCategoryList } from '@/types/Api';
import { getCategoryList } from '@/utils/axios/api';
import { getNoticeCnt } from '@/utils/axios/notice';
import style from './SideLayout.module.scss';

function SideLayout({ children }: { children: React.ReactNode }) {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  const { data: noticeCnt } = useQuery<number>('noticeCnt', getNoticeCnt);

  if (!userInfo || !categoryList || noticeCnt === undefined) {
    return null;
  }
  const firstCategory = categoryList[0]?.categoryId;

  return (
    <div className={`${style.page}`}>
      {/* Side NavBar */}
      <NavBar position="side" userInfo={userInfo} noticeCnt={noticeCnt} firstCategory={firstCategory} />
      {/* Page Content */}
      <div className={`${style.pageContainer}`}>{children}</div>
    </div>
  );
}

export default SideLayout;
