import React from 'react';
import { IUser } from '@/types/User';
import MyPageBox from '@/components/organisms/MyPageBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
import MyPageSideBar from '@/components/organisms/MyPageSideBar';
import BothLayout from '@/components/templates/BothLayout';

const MyInfo: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (!userInfo) {
    return null;
  }

  return (
    <BothLayout>
      <MyPageSideBar />
      <MyPageBox userInfo={userInfo} type='info'/>
    </BothLayout>
  );
};

export default MyInfo;
