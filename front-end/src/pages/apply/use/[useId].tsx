import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IUseDetail } from '@/types/Apply';
import { getUseApplyDetail } from '@/utils/axios/apply';
import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import RowTable from '@/components/atoms/RowTable';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import style from '@/styles/UseDetail.module.scss';

type SSGProps = {
  isUser: boolean;
  useId: number;
};

const UseDetail: NextPage<SSGProps> = ({ isUser, useId }: SSGProps) => {
  const { data: details } = useQuery<IUseDetail>(`useApplyDetail ${useId}`, () => getUseApplyDetail(useId));

  if (!details) {
    return null;
  }

  const headerContentT = ['카테고리명', '신청팀', '신청자'];
  const bodyContentT = [
    {
      카테고리명: details.categoryName,
      신청팀: details.teamName,
      신청자: details.userName,
    },
  ];

  const headerContentB = ['처리상태', '처리내용'];
  let 처리내용 = '';

  if (details.state === '승인') {
    처리내용 = `${details.categoryName} 카테고리 사용 신청 승인되었습니다`;
  } else if (details.state === '거절') {
    처리내용 = details.denyReason;
  } else {
    처리내용 = `${details.categoryName} 카테고리 사용 신청 대기중입니다.`;
  }

  const bodyContentB = [
    {
      처리상태: details.state,
      처리내용,
    },
  ];

  return (
    <BothLayout>
      <ApplySideBar isUser={isUser} />
      <div className={`${style.detailContainer}`}>
        <div className={`${style.label}`}>
          <GoBack label="서버 사용 신청 내역" />
        </div>
        <div className={`${style.tableContainer}`}>
          <div className={`${style.table}`}>
            <RowTable title="신청 정보" headerContent={headerContentT} bodyContent={bodyContentT} />
          </div>
          <div className={`${style.table}`}>
            <RowTable title="신청 상태" headerContent={headerContentB} bodyContent={bodyContentB} />
          </div>
        </div>
      </div>
    </BothLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true, // fallback을 true로 설정하면, 존재하지 않는 경로로 접근 시 404 페이지가 아닌 서버사이드 렌더링이 이루어집니다.
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const useId = params?.useId; // 경로 매개변수에서 useId 가져오기
  await queryClient.prefetchQuery(`useApplyDetail ${useId}`, () => getUseApplyDetail(Number(useId)));
  const isUser = true;
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isUser,
      useId,
    },
    revalidate: 60,
  };
};
export default UseDetail;
