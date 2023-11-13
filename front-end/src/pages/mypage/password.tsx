import React from 'react';
import { IUser } from '@/types/User';
import MyPageBox from '@/components/organisms/MyPageBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
import MyPageSideBar from '@/components/organisms/MyPageSideBar';
import BothLayout from '@/components/templates/BothLayout';

const Password: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <BothLayout>
      <MyPageSideBar />
      <MyPageBox userInfo={userInfo} type='password'/>
    </BothLayout>
  );
};

export default Password;
