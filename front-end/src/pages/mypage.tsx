import React from 'react';
import { IUser } from '@/types/User';
import GoBack from '@/components/atoms/GoBack';
import MyPageBox from '@/components/organisms/MyPageBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
// import TopLayout from '@/components/templates/TopLayout';
import styles from '@/components/templates/TopLayout/TopLayout.module.scss';
// import SideLayout from '@/components/templates/SideLayout';
import MyPageSideBar from '@/components/organisms/MyPageSideBar';
import BothLayout from '@/components/templates/BothLayout';

const MyPage: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <BothLayout>
      <MyPageSideBar />
      <div className={styles.topPageContainer}>
        <div style={{ margin: '0 200px' }}>
          <GoBack label="마이페이지" />
          <MyPageBox userInfo={userInfo} />
        </div>
      </div>
    </BothLayout>
  );
};

export default MyPage;
