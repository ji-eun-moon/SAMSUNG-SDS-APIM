import React from 'react';
import { IUser } from '@/types/User';
import SideLayout from '@/components/templates/SideLayout';
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

  if (userInfo === undefined || categoryList === undefined) {
    return null;
  }

  return (
    <SideLayout>
      <div>
        <GoBack label="사원생성" />
        <AddMemberBox />
      </div>
    </SideLayout>
  );
};

export default MemberAdd;
