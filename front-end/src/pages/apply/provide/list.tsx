// import { GetServerSidePropsContext, GetStaticProps, NextPage } from 'next';
// import { IProvide } from '@/types/Apply';
// import { getProvideApplyList } from '@/utils/axios/apply';
// import ApplySideBar from '@/components/organisms/ApplySideBar';
// import BothLayout from '@/components/templates/BothLayout';
// import ColTable from '@/components/atoms/ColTable';
// import GoBack from '@/components/atoms/GoBack';
// import StyledPagination from '@/components/atoms/StyledPagination';
// import style from '@/styles/ProvideList.module.scss';
// import { useState } from 'react';

// type SSRProps = {
//   lists: IProvide[];
//   totalPage: number;
//   isUser: boolean;
// };

// const ProvideList: NextPage<SSRProps> = ({ lists, totalPage, isUser }: SSRProps) => {
//   // date 형식 변경
//   const formatDate = (dateString: Date) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // headerContent 설정
//   const headerContent = ['ID', '서버명', '팀', '제공자', '신청일', '상태', '구분']; // 구분(applyType):'신청'|'변경'

//   // bodyContent 설정
//   const bodyContent = lists.map((list) => ({
//     ID: list.provideId,
//     서버명: list.serverName,
//     팀: list.teamName,
//     제공자: list.providerName,
//     신청일: formatDate(list.createdAt), // 여기서 날짜 형식을 변경
//     상태: list.state,
//     구분: list.applyType,
//   }));

//   const [clickPage, setClickPage] = useState(0);

//   return (
//     <BothLayout>
//       {/* Top Nav */}
//       <div>Top Nav 들어갈 부분</div>
//       {/* Side Nav */}
//       <ApplySideBar isUser={isUser} />
//       {/* Page Content */}
//       <div className={`${style.listContainer}`}>
//         <GoBack label="API 제공 신청 내역" />
//         <ColTable headerContent={headerContent} bodyContent={bodyContent} />
//         <StyledPagination totalPage={totalPage} clickPage={clickPage} onClickPage={setClickPage} />
//       </div>
//     </BothLayout>
//   );
// };

// export const getServerSideProps: GetStaticProps<SSRProps> = async ({ query }) => {
//   const clickPage = query.page ? parseInt(query.page as string, 10) : 1;
//   const response = await getProvideApplyList(clickPage);
//   const lists = response.content;
//   const totalPage = response.totalPages;
//   const isUser = true;
//   return {
//     props: {
//       lists,
//       totalPage: totalPage || null,
//       isUser,
//     },
//   };
// };

// export default ProvideList;

import { GetServerSideProps, NextPage } from 'next';
import { IProvide } from '@/types/Apply';
import { getProvideApplyList } from '@/utils/axios/apply';
import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import ColTable from '@/components/atoms/ColTable';
import GoBack from '@/components/atoms/GoBack';
import StyledPagination from '@/components/atoms/StyledPagination';
import style from '@/styles/ProvideList.module.scss';
import { useState } from 'react';

type SSRProps = {
  lists: IProvide[];
  totalPage: number;
  isUser: boolean;
};

const ProvideList: NextPage<SSRProps> = ({ lists, totalPage, isUser }: SSRProps) => {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const headerContent = ['ID', '서버명', '팀', '제공자', '신청일', '상태', '구분'];

  const bodyContent = lists.map((list) => ({
    ID: list.provideId,
    서버명: list.serverName,
    팀: list.teamName,
    제공자: list.providerName,
    신청일: formatDate(list.createdAt),
    상태: list.state,
    구분: list.applyType,
  }));

  const [clickPage, setClickPage] = useState(1);

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  return (
    <BothLayout>
      <div>Top Nav 들어갈 부분</div>
      <ApplySideBar isUser={isUser} />
      <div className={`${style.listContainer}`}>
        <GoBack label="API 제공 신청 내역" />
        <ColTable headerContent={headerContent} bodyContent={bodyContent} />
        <StyledPagination totalPage={totalPage} clickPage={clickPage} onClickPage={handlePageClick} />
      </div>
    </BothLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({ query }) => {
  const clickPage = query.page ? parseInt(query.page as string, 10) : 1;
  const response = await getProvideApplyList(clickPage - 1);
  const lists = response.content || [];
  const totalPage = response.totalPages || 0;
  const isUser = true;
  return {
    props: {
      lists,
      totalPage,
      isUser,
    },
  };
};

export default ProvideList;
