import React from 'react';
import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { IUser } from '@/types/User';
import styles from './MyPageSideBar.module.scss';

function MyPageSideBar() {
  //   const router = useRouter();
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <div className={styles.SideBarBody}>
      <div className={styles.SideBarContent}>
        <div>
          <div className="my-2 itdaBlue font-bold">마이페이지</div>
          <div>
            <div>개인정보 확인</div>
            <div>비밀번호 변경</div>
          </div>
        </div>
        <div>
          <div>팀정보</div>
          <div>
            <div>팀토큰 확인</div>
            <div>팀원정보 확인</div>
          </div>
        </div>
      </div>
    </div>
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
