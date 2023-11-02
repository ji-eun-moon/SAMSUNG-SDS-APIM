import React from 'react';
import { IUser } from '@/types/User';
import SideLayout from '@/components/templates/SideLayout';
import NavBar from '@/components/organisms/NavBar';
import GoBack from '@/components/atoms/GoBack';
import AddMemberBox from '@/components/organisms/AddMemberBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
import { getCategoryList } from '@/utils/axios/api';
import { TCategoryList } from '@/types/Api';

const MemberAdd: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  console.log(userInfo, 'userInfo 출력');

  if (userInfo === undefined || categoryList === undefined) {
    return null;
  }

  const firstCategory = categoryList[0].categoryId;

  return (
    <SideLayout>
      <NavBar position="side" userInfo={userInfo} noticeCnt="5" firstCategory={firstCategory} />
      <div>
        <GoBack label="사원생성" />
        <AddMemberBox />
      </div>
    </SideLayout>
  );
};

export default MemberAdd;
