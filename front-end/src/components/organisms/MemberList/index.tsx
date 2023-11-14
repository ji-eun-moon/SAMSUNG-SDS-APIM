import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getMembers } from '@/utils/axios/user';
import { IUserInfo } from '@/types/User';
// import TopLayout from '@/components/templates/TopLayout';
import GoBack from '@/components/atoms/GoBack';
import UserListBox from '@/components/organisms/UserListBox';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledPagination from '@/components/atoms/StyledPagination';
// import styles from '@/components/templates/TopLayout/TopLayout.module.scss';

const MemberList: NextPage = () => {
  const [clickPage, setClickPage] = useState(1);
  const { data: memberList } = useQuery<IUserInfo>(`memberList ${clickPage}`, async () => {
    const result = await getMembers({ page: clickPage - 1, size: 10 });
    return result;
  });

  if (memberList === undefined) {
    return null;
  }

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  return (
    <div>
      <GoBack label="사원 정보 조회" />
      <div className="mt-5">
        <ShadowCard type="big">
          <UserListBox userList={memberList.content} />
          <div className="flex justify-center mt-2" style={{ overflowY: 'hidden' }}>
            <StyledPagination totalPage={memberList?.totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
          </div>
        </ShadowCard>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('memberList', () => getMembers({ page: 0, size: 8 }));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MemberList;
