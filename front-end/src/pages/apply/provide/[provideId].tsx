import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IProvideDetail } from '@/types/Apply';
import { getProvideApplyDetail } from '@/utils/axios/apply';
import { putProvideApplyAccept, putProvideApplyDeny } from '@/utils/axios/admin';

import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import RowTable from '@/components/atoms/RowTable';
import style from '@/styles/ProvideDetail.module.scss';
import { IUser } from '@/types/User';
import { getUserInfo } from '@/utils/axios/user';
import StyledButton from '@/components/atoms/StyledButton';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';
import useUserStore from '@/store/useUserStore';
import { useEffect, useState } from 'react';

type SSGProps = {
  isUser: boolean;
  provideId: number;
};

const ProvideDetail: NextPage<SSGProps> = ({ isUser, provideId }: SSGProps) => {
  const router = useRouter();
  const { selectedTeam } = useUserStore();

  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: details } = useQuery<IProvideDetail>(`provideApplyDetail ${provideId}`, () =>
    getProvideApplyDetail(provideId),
  );
  const [action, setAction] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (details && selectedTeam !== details.teamName && userInfo && userInfo.authority !== '관리자') {
      router.push('/apply/provide/list');
    }
  }, [details, selectedTeam, router, userInfo]);

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
    처리내용 = `${details.serverName} 서버 제공 신청 승인되었습니다`;
  } else if (details.state === '거절') {
    처리내용 = details.denyReason;
  } else {
    처리내용 = `${details.serverName} 서버 제공 신청 대기중입니다.`;
  }

  const bodyContentB = [
    {
      처리상태: details.state,
      처리내용,
    },
  ];

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleApproveDeny = (actionProps: string, contentProps: string) => {
    setAction(actionProps);
    setContent(contentProps);
  };

  const onSubmitHandler = async () => {
    console.log('action', action);
    console.log('content', content);
    if (action === 'accept') {
      // 승인 처리
      await putProvideApplyAccept(provideId, details.apiDocs);
      // 추가로 수행해야 할 승인 작업이 있다면 여기에 추가하세요.
    } else if (action === 'deny') {
      // 거절 처리
      await putProvideApplyDeny(provideId, content);
      // 추가로 수행해야 할 거절 작업이 있다면 여기에 추가하세요.
    }
    router.push('/admin/provideApplyList');
  };

  return (
    <BothLayout>
      <ApplySideBar isUser={isUser} />
      <div className={`${style.detailContainer}`}>
        <div className={`${style.label}`}>
          <GoBack label="서버 제공 신청 내역" />
        </div>
        <div className={`${style.tableContainer}`}>
          <div className={`${style.date}`}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <svg
                className="w-3 h-3 text-gray-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                />
              </svg>
              신청 날짜 : {formatDate(details.createdAt)}
            </span>
            {details.state === '승인' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <svg
                  className="w-3 h-3 text-green-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                승인 날짜 : {formatDate(details.modifiedAt)}
              </span>
            )}
            {details.state === '거절' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <svg
                  className="w-3 h-3 text-red-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                거절 날짜 : {formatDate(details.modifiedAt)}
              </span>
            )}
          </div>
          <div className={`${style.table}`}>
            <RowTable
              title="신청 정보"
              headerContent={headerContentT}
              bodyContent={bodyContentT}
              onApproveDeny={() => {}}
            />
          </div>
          <div className={`${style.table}`}>
            {userInfo?.authority === '관리자' ? (
              <RowTable
                title="API 관리"
                headerContent={headerContentB}
                bodyContent={bodyContentB}
                onApproveDeny={handleApproveDeny}
              />
            ) : (
              <RowTable
                title="신청 상태"
                headerContent={headerContentB}
                bodyContent={bodyContentB}
                onApproveDeny={() => {}}
              />
            )}
          </div>
        </div>
        {userInfo?.authority === '관리자' && details.state === '대기' ? (
          <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '50px' }}>
            <div className="w-20">
              <StyledButton
                label="저장하기"
                radius="sm"
                variant="solid"
                type="button"
                onClick={() => onSubmitHandler()}
              />
            </div>
          </div>
        ) : null}
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
