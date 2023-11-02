// // import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// // import { IProvide, IProvideDetail } from '@/types/Apply';
// // import { getProvideApplyDetail, getProvideApplyId } from '@/utils/axios/apply';
// // import ApplySideBar from '@/components/organisms/ApplySideBar';
// // import BothLayout from '@/components/templates/BothLayout';
// // import GoBack from '@/components/atoms/GoBack';
// // import RowTable from '@/components/atoms/RowTable';
// // import style from '@/styles/ProvideDetail.module.scss';
// // import { QueryClient } from 'react-query';

// // interface IProvideId extends IProvide, IProvideDetail {}

// // type SSGProps = {
// //   details: IProvideId[];
// //   isUser: boolean;
// // };

// // const ProvideDetail: NextPage<SSGProps> = ({ details, isUser }: SSGProps) => {
// //   const headerContent = ['서버명', '서버설명', '신청팀', '담당자', '서버주소'];
// //   const bodyContent = details?.map((detail) => ({
// //     서버명: detail.serverName,
// //     서버설명: detail.description,
// //     신청팀: detail.teamName,
// //     담당자: detail.providerName,
// //     서버주소: detail.apiDocs,
// //   }));

// //   return (
// //     <BothLayout>
// //       <div>Top Nav 들어갈 부분</div>
// //       <ApplySideBar isUser={isUser} />
// //       <div className={`${style.listContainer}`}>
// //         <GoBack label="API 제공 신청 내역" />
// //         <RowTable title="신청 정보" headerContent={headerContent} bodyContent={bodyContent} />
// //       </div>
// //     </BothLayout>
// //   );
// // };
// // export default ProvideDetail;

// // // export const getStaticPaths: GetStaticPaths = async () => {
// // //   // const ids = await getProvideApplyId();
// // //   // console.log('ids', ids);
// // //   // const paths =
// // //   //   ids?.map((id: IProvideId) => ({
// // //   //     params: { provideId: id.provideId.toString() },
// // //   //   })) || [];
// // //   const paths = [{ params: { provideId: '1' } }];
// // //   console.log(paths);
// // //   return {
// // //     paths,
// // //     fallback: true, // fallback을 true로 설정하면, 존재하지 않는 경로로 접근 시 404 페이지가 아닌 서버사이드 렌더링이 이루어집니다.
// // //   };
// // // };

// // // export const getStaticProps: GetStaticProps = async ({ params }) => {
// // //   const queryClient = new QueryClient();
// // //   const provideId = params?.provideId; // 경로 매개변수에서 provideId 가져오기

// // //   if (!provideId) {
// // //     return {
// // //       notFound: true,
// // //     };
// // //   }

// // //   const details = await queryClient.prefetchQuery('provideApplyDetail', () => getProvideApplyDetail(Number(provideId)));
// // //   const isUser = true;
// // //   console.log('details', details);

// // //   if (details === undefined) {
// // //     return {
// // //       props: {
// // //         details: null,
// // //         isUser: true,
// // //       },
// // //       revalidate: 60,
// // //     };
// // //   }

// // //   return {
// // //     props: {
// // //       details,
// // //       isUser,
// // //     },
// // //     revalidate: 60,
// // //   };
// // // };
// // // export default ProvideDetail;

// import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// import { IProvide, IProvideDetail } from '@/types/Apply';
// import { getProvideApplyDetail } from '@/utils/axios/apply';
// import ApplySideBar from '@/components/organisms/ApplySideBar';
// import BothLayout from '@/components/templates/BothLayout';
// import GoBack from '@/components/atoms/GoBack';
// import RowTable from '@/components/atoms/RowTable';
// import style from '@/styles/ProvideDetail.module.scss';

// import React, { useEffect, useState } from 'react';

// interface IProvideId extends IProvide, IProvideDetail {}

// function ProvideDetail() {
//   const [detail, setDetail] = useState<IProvideId | null>(null);
//   const [bodyContent, setBodyContent] = useState({});
//   const isUser = true;

//   useEffect(() => {
//     console.log('야야야아아아ㅏㅇ');
//     const fetchData = async () => {
//       const data = await getProvideApplyDetail(1);
//       setDetail(data);
//       const hi = [
//         {
//           서버명: data.serverName,
//           서버설명: data.description,
//           신청팀: data.teamName,
//           담당자: data.providerName,
//           서버주소: data.apiDocs,
//         },
//       ];
//       setBodyContent(hi);
//     };
//     fetchData();
//   }, []);
//   console.log('제에에에에에에에에에에에에엥에ㅔ엥에에에에발', detail);
//   const headerContent = ['서버명', '서버설명', '신청팀', '담당자', '서버주소'];
//   // const bodyContent = [
//   //   {
//   //     서버명: detail.serverName,
//   //     서버설명: detail.description,
//   //     신청팀: detail.teamName,
//   //     담당자: detail.providerName,
//   //     서버주소: detail.apiDocs,
//   //   },
//   // ];

//   return (
//     <BothLayout>
//       <div>Top Nav 들어갈 부분</div>
//       <ApplySideBar isUser={isUser} />
//       <div className={`${style.listContainer}`}>
//         <GoBack label="API 제공 신청 내역" />
//         <RowTable title="신청 정보" headerContent={headerContent} bodyContent={bodyContent} />
//       </div>
//     </BothLayout>
//   );
// }

// export default ProvideDetail;
// //
// // interface IProvideId extends IProvide, IProvideDetail {}

// // type SSGProps = {
// //   detail: IProvideId; // 단일 데이터로 변경
// //   isUser: boolean;
// // };

// // const ProvideDetail: NextPage<SSGProps> = ({ detail, isUser }: SSGProps) => {
// //   const headerContent = ['서버명', '서버설명', '신청팀', '담당자', '서버주소'];
// //   const bodyContent = [
// //     {
// //       서버명: detail.serverName,
// //       서버설명: detail.description,
// //       신청팀: detail.teamName,
// //       담당자: detail.providerName,
// //       서버주소: detail.apiDocs,
// //     },
// //   ];

// //   return (
// //     <BothLayout>
// //       <div>Top Nav 들어갈 부분</div>
// //       <ApplySideBar isUser={isUser} />
// //       <div className={`${style.listContainer}`}>
// //         <GoBack label="API 제공 신청 내역" />
// //         <RowTable title="신청 정보" headerContent={headerContent} bodyContent={bodyContent} />
// //       </div>
// //     </BothLayout>
// //   );
// // };

// // export default ProvideDetail;

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   // 여기서 가능한 provideId 목록을 가져와야 합니다.
// //   // 예를 들어 [1, 2, 3]이 가능하다고 가정합니다.
// //   const possibleProvideIds = [1, 2, 3];

// //   const paths = possibleProvideIds.map((provideId) => ({
// //     params: { provideId: provideId.toString() },
// //   }));

// //   return { paths, fallback: false };
// // };

// // export const getStaticProps: GetStaticProps<SSGProps> = async ({ params }) => {
// //   const provideId = params?.provideId as string;
// //   const parsedProvideId = parseInt(provideId, 10);

// //   if (Number.isNaN(parsedProvideId)) {
// //     return {
// //       notFound: true,
// //     };
// //   }

// //   const detail = await getProvideApplyDetail(parsedProvideId);

// //   return {
// //     props: {
// //       detail,
// //       isUser: true, // 필요에 따라 수정하세요.
// //     },
// //     revalidate: 60, // 60초마다 페이지를 재생성합니다. 필요에 따라 조절하세요.
// //   };
// // };

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

  const headerContent = ['서버명', '서버설명', '신청팀', '담당자', '서버주소'];
  const bodyContent = [
    {
      서버명: details.serverName,
      서버설명: details.description,
      신청팀: details.teamName,
      담당자: details.providerName,
      서버주소: details.apiDocs,
    },
  ];

  return (
    <BothLayout>
      <div>Top Nav 들어갈 부분</div>
      <ApplySideBar isUser={isUser} />
      <div className={`${style.listContainer}`}>
        <GoBack label="API 제공 신청 내역" />
        <RowTable title="신청 정보" headerContent={headerContent} bodyContent={bodyContent} />
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
