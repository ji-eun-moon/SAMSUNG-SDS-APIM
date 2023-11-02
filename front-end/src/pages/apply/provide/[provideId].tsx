import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IProvideDetail } from '@/types/Apply';
import { getProvideApplyDetail } from '@/utils/axios/apply';
import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import RowTable from '@/components/atoms/RowTable';
import style from '@/styles/ProvideDetail.module.scss';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

type SSGProps = {
  isUser: boolean;
  provideId: number;
};

const ProvideDetail: NextPage<SSGProps> = ({ isUser, provideId }: SSGProps) => {
  const { data: details } = useQuery<IProvideDetail>(`provideApplyDetail ${provideId}`, () =>
    getProvideApplyDetail(provideId),
  );

  if (!details) {
    return null;
  }

  const onApplyType = (applyType: string) => {
    if (applyType === '신규') {
      return `newnew${details.serverName}`;
    }
    if (applyType === '변경') {
      return `chacha${details.serverName}`;
    }
    return `${details.serverName}`;
  };

  const headerContentT = ['서버명', '서버설명', '신청팀', '담당자', '서버주소'];
  const bodyContentT = [
    {
      서버명: onApplyType(details.applyType),
      서버설명: details.description,
      신청팀: details.teamName,
      담당자: details.providerName,
      서버주소: details.apiDocs,
    },
  ];

  const headerContentB = ['처리상태', '처리내용'];
  let 처리내용 = '';

  if (details.state === '승인') {
    처리내용 = `${details.serverName} 서버 신청 승인되었습니다`;
  } else if (details.state === '거절') {
    처리내용 = details.denyReason;
  } else {
    처리내용 = `${details.serverName} 서버 신청 대기중입니다.`;
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
          <GoBack label="서버 제공 신청 내역" />
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
  const provideId = params?.provideId; // 경로 매개변수에서 provideId 가져오기
  await queryClient.prefetchQuery(`provideApplyDetail ${provideId}`, () => getProvideApplyDetail(Number(provideId)));
  const isUser = true;
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isUser,
      provideId,
    },
    revalidate: 60,
  };
};
export default ProvideDetail;
