import React from 'react';
import { IUser } from '@/types/User';
import SideLayout from '@/components/templates/SideLayout';
import NavBar from '@/components/organisms/NavBar';
import GoBack from '@/components/atoms/GoBack';
import MyPageBox from '@/components/organisms/MyPageBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';

const MyPage: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <SideLayout>
      <NavBar position="side" userInfo={userInfo} noticeCnt="5" />
      <div>
        <GoBack label="마이페이지" />
        <MyPageBox userInfo={userInfo} />
      </div>
    </SideLayout>
  );
};

export default MyPage;
