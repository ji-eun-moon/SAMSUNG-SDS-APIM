// import { IUser } from '@/types/User';
// import { NextPage, GetServerSideProps } from 'next';
// import { getApiStatus } from '@/utils/axios/api';
// import { useQuery, QueryClient } from 'react-query';
// import { dehydrate } from 'react-query/hydration';

// const ApiStatus: NextPage = () => {
//   const { data: userInfo } = useQuery<IUser>('apiStatus', getApiStatus);

//   if (userInfo === undefined) {
//     return null;
//   }
//   return <div>API 상태페이지</div>;
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery('apiStatus', getApiStatus);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

// export default ApiStatus;

export default function ApiStatus() {
  return <div>API 상태 페이지</div>;
}
