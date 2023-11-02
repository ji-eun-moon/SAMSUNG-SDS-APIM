import { GetServerSideProps, NextPage } from 'next';
import { IResponseProvide } from '@/types/Apply';
import { getProvideApplyList } from '@/utils/axios/apply';
import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import ColTable from '@/components/atoms/ColTable';
import GoBack from '@/components/atoms/GoBack';
import StyledPagination from '@/components/atoms/StyledPagination';
import style from '@/styles/ProvideList.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

type SSRProps = {
  isUser: boolean;
};

const ProvideList: NextPage<SSRProps> = ({ isUser }: SSRProps) => {
  const router = useRouter();

  const [clickPage, setClickPage] = useState(1);
  const { data: responseProvide } = useQuery<IResponseProvide>(
    ['provideApplyList', clickPage], // 첫 번째 인자는 쿼리 키입니다.
    () => getProvideApplyList(clickPage - 1), // 두 번째 인자는 해당 쿼리에 대한 함수입니다.
  );

  if (!responseProvide) {
    return null;
  }

  const lists = responseProvide.content;
  const totalPage = responseProvide.totalPages;

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const headerContent = ['구분', '서버명', '신청자', '신청날짜', '상태'];

  const bodyContent = lists?.map((list) => ({
    ID: list.provideId,
    구분: list.applyType,
    서버명: list.serverName,
    신청자: list.providerName,
    신청날짜: formatDate(list.createdAt),
    상태: list.state,
  }));

  // 다음 페이지의 데이터가 적을 경우 빈 값을 추가합니다.
  if (bodyContent.length < 6) {
    while (bodyContent.length < 6) {
      bodyContent.push({
        ID: `empty_${bodyContent.length + 1}`,
        구분: '',
        서버명: '',
        신청자: '',
        신청날짜: '',
        상태: '',
      });
    }
  }

  const onGoDetailHandler = (provideId: string) => {
    console.log(provideId, clickPage);
    router.push(`/apply/provide/${provideId}`);
  };

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
    // queryClient.removeQueries(['provideApplyList', clickPage]); // 이전 페이지의 데이터를 제거
  };

  return (
    <BothLayout>
      <ApplySideBar isUser={isUser} />
      <div className={`${style.listContainer}`}>
        <div className={`${style.label}`}>
          <GoBack label="API 제공 신청 내역" />
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
  await queryClient.prefetchQuery('provideApplyList', () => getProvideApplyList(clickPage));
  const isUser = true;
  return {
    props: {
      isUser,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProvideList;
