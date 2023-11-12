import React from 'react';
import { IUser } from '@/types/User';
import GoBack from '@/components/atoms/GoBack';
import MyPageBox from '@/components/organisms/MyPageBox';
import { NextPage } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
import TopLayout from '@/components/templates/TopLayout';

const MyPage: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <TopLayout>
      <div style={{ margin: '30px 200px' }}>
        <div>
          <GoBack label="마이페이지" />
          <MyPageBox userInfo={userInfo} />
        </div>
      </div>
    </TopLayout>
  );
};

export default MyPage;
