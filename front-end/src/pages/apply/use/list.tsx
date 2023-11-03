// export default function UseList() {
//   return <div>사용 신청 내역</div>;
// }

import { GetServerSideProps, NextPage } from 'next';
import { IResponseUse } from '@/types/Apply';
import { getUseApplyList } from '@/utils/axios/apply';
import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import ColTable from '@/components/atoms/ColTable';
import GoBack from '@/components/atoms/GoBack';
import StyledPagination from '@/components/atoms/StyledPagination';
import style from '@/styles/UseList.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

type SSRProps = {
  isUser: boolean;
};

const UseList: NextPage<SSRProps> = ({ isUser }: SSRProps) => {
  const router = useRouter();

  const [clickPage, setClickPage] = useState(1);
  const { data: responseUse } = useQuery<IResponseUse>(
    ['useApplyList', clickPage], // 첫 번째 인자는 쿼리 키
    () => getUseApplyList(clickPage - 1), // 두 번째 인자는 해당 쿼리에 대한 함수
  );

  if (!responseUse) {
    return null;
  }

  const lists = responseUse.content;
  const totalPage = responseUse.totalPages;

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const headerContent = ['카테고리명', '신청자', '신청날짜', '상태'];

  const bodyContent = lists?.map((list) => ({
    ID: list.useApplyId,
    카테고리명: list.categoryName,
    신청자: list.userName,
    신청날짜: formatDate(list.createdAt),
    상태: list.state,
  }));

  // 다음 페이지의 데이터가 적을 경우 빈 값을 추가
  if (bodyContent.length < 9) {
    while (bodyContent.length < 9) {
      bodyContent.push({
        ID: `empty_${bodyContent.length + 1}`,
        카테고리명: '',
        신청자: '',
        신청날짜: '',
        상태: '',
      });
    }
  }

  const onGoDetailHandler = (useId: string) => {
    console.log(useId, clickPage);
    router.push(`/apply/use/${useId}`);
  };

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  return (
    <BothLayout>
      <ApplySideBar isUser={isUser} />
      <div className={`${style.listContainer}`}>
        <div className={`${style.label}`}>
          <GoBack label="서버 사용 신청 내역" />
        </div>
        <ColTable headerContent={headerContent} bodyContent={bodyContent} onGoDetail={onGoDetailHandler} />
        <StyledPagination totalPage={totalPage} clickPage={clickPage} onClickPage={handlePageClick} />
      </div>
    </BothLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({ query }) => {
  const clickPage = query.page ? parseInt(query.page as string, 10) : 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('useApplyList', () => getUseApplyList(clickPage));
  const isUser = true;
  return {
    props: {
      isUser,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UseList;
