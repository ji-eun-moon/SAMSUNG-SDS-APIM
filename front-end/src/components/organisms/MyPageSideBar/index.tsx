import React from 'react';
import { GetServerSideProps } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { IUser } from '@/types/User';
// import styles from './MyPageSideBar.module.scss';
import SideBarBody from '@/components/atoms/SideBarBody';
import SideBarMenu from '@/components/atoms/SideBarMenu';

function MyPageSideBar() {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (!userInfo) {
    return null;
  }

  const mypageCondition = [
    { conditionId: '1', title: '개인정보확인', url: '/mypage/info' },
    { conditionId: '2', title: '비밀번호변경', url: '/mypage/password' },
  ];

  const teamInfoCondition = [
    { conditionId: '1', title: '팀토큰 확인', url: '/team/token' },
    { conditionId: '2', title: '팀원 정보 확인', url: '/team/member' },
  ];

  return (
    <SideBarBody>
      <div className="my-5 text-xl font-bold mx-2">마이페이지</div>
      <div className="grid grid-cols-1 content-between h-full mb-5">
        {userInfo?.authority === '일반' ? (
          <div>
            <SideBarMenu title="개인정보" conditionList={mypageCondition} />
            <SideBarMenu title="팀정보" conditionList={teamInfoCondition} />
          </div>
        ) : (
          <div>
            <SideBarMenu title="개인정보" conditionList={mypageCondition} />
          </div>
        )}
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

export default MyPageSideBar;
