import React from 'react';
import { GetServerSideProps } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { IUser } from '@/types/User';
import SideBarBody from '@/components/atoms/SideBarBody';
import SideBarMenu from '@/components/atoms/SideBarMenu';

function MemberPageSideBar() {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (!userInfo) {
    return null;
  }

  const memberPageCondition = [
    { conditionId: '1', title: '사원정보확인', url: '/member/list' },
    { conditionId: '2', title: '사원 추가', url: '/member/add' },
  ];

  return (
    <SideBarBody>
      <div className="my-5 text-xl font-bold mx-2">사원관리</div>
      <div className="grid grid-cols-1 content-between h-full mb-5">
        <div>
          <SideBarMenu title="사원정보" conditionList={memberPageCondition} />
        </div>
      </div>
    </SideBarBody>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MemberPageSideBar;
