import React from 'react';
import { IUser } from '@/types/User';
import BothLayout from '@/components/templates/BothLayout';
// import GoBack from '@/components/atoms/GoBack';
import MemberBox from '@/components/organisms/MemberBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
import { getCategoryList } from '@/utils/axios/api';
import { TCategoryList } from '@/types/Api';
// import styles from '@/components/templates/TopLayout/TopLayout.module.scss';
import MemberPageSideBar from '@/components/organisms/MemberPageSideBar';

const MemberAdd: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);

  if (userInfo === undefined || categoryList === undefined) {
    return null;
  }

  return (
    <BothLayout>
      <MemberPageSideBar />

      <MemberBox userInfo={userInfo} type="add" />
    </BothLayout>
  );
};

export default MemberAdd;
