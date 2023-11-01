import React from 'react';
import { IUser } from '@/types/User';
import SideLayout from '@/components/templates/SideLayout';
import NavBar from '@/components/organisms/NavBar';
import GoBack from '@/components/atoms/GoBack';
import AddMemberBox from '@/components/organisms/AddMemberBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';

const MemberAdd: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  console.log(userInfo, 'userInfo 출력');

  if (userInfo === undefined) {
    return null;
  }

  return (
    <SideLayout>
      <NavBar position="side" userInfo={userInfo} noticeCnt="5" />
      <div>
        <GoBack label="사원생성" />
        <AddMemberBox />
      </div>
    </SideLayout>
  );
};

export default MemberAdd;
