import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getMembers } from '@/utils/axios/user';
import { IUserInfo } from '@/types/User';
import SideLayout from '@/components/templates/SideLayout';
import GoBack from '@/components/atoms/GoBack';
import UserListBox from '@/components/organisms/UserListBox';
import StyledPagination from '@/components/atoms/StyledPagination';

const MemberList: NextPage = () => {
  const [clickPage, setClickPage] = useState(1);
  const { data: memberList } = useQuery<IUserInfo>(`memberList ${clickPage}`, async () => {
    const result = await getMembers({ page: clickPage - 1, size: 2 });
    return result;
  });

  if (memberList === undefined) {
    return null;
  }

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  return (
    <SideLayout>
      <GoBack label="사원 관리" />
      <UserListBox userList={memberList.content} />
      <div className="flex justify-center mt-4">
        <StyledPagination totalPage={memberList?.totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
      </div>
    </SideLayout>
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
