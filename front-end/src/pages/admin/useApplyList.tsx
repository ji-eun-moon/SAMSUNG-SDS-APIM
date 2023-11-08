import { GetServerSideProps, NextPage } from 'next';
import { IResponseUse } from '@/types/Apply';
import { getAdminUseApplyList } from '@/utils/axios/apply';
import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import ColTable from '@/components/atoms/ColTable';
import GoBack from '@/components/atoms/GoBack';
import StyledPagination from '@/components/atoms/StyledPagination';
import style from '@/styles/UseList.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

type SSRProps = {
  isUser: boolean;
};

const UseList: NextPage<SSRProps> = ({ isUser }: SSRProps) => {
  const router = useRouter();
  const [state, setState] = useState('');
  const [clickPage, setClickPage] = useState(1);
  const { data: responseUse } = useQuery<IResponseUse>(
    ['useApplyList', clickPage, state], // 첫 번째 인자는 쿼리 키
    () => getAdminUseApplyList(clickPage - 1, state), // 두 번째 인자는 해당 쿼리에 대한 함수
  );

  useEffect(() => {
    const filter = Array.isArray(router.query.filter) ? router.query.filter[0] : router.query.filter;

    if (filter === undefined) {
      setState('');
    } else if (filter === '대기') {
      setState('대기');
    } else if (filter === '승인') {
      setState('승인');
    } else if (filter === '거절') {
      setState('거절');
    }

    // 여기에서 getProvideApplyList 함수 호출하지 않음
  }, [router.query.filter, clickPage]);

  if (!responseUse) {
    return null;
  }

  const lists = responseUse.content;
  const totalPage = responseUse.totalPages;

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const col = [30, 15, 15, 25, 15];
  const headerContent = ['카테고리명', '신청자', '팀', '신청날짜', '상태'];

  const bodyContent = lists?.map((list) => ({
    ID: list.useApplyId,
    카테고리명: list.categoryName,
    신청자: list.userName,
    팀: list.teamName,
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
        팀: '',
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
        <ColTable col={col} headerContent={headerContent} bodyContent={bodyContent} onGoDetail={onGoDetailHandler} />
        <StyledPagination totalPage={totalPage} clickPage={clickPage} onClickPage={handlePageClick} />
      </div>
    </BothLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({ query }) => {
  const clickPage = query.page ? parseInt(query.page as string, 10) : 1;
  const state = Array.isArray(query.filter) ? query.filter[0] : query.filter || ''; // filter 값을 문자열로 변환하여 state 변수에 할당
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('useApplyList', () => getAdminUseApplyList(clickPage, state));
  const isUser = true;
  return {
    props: {
      isUser,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UseList;
