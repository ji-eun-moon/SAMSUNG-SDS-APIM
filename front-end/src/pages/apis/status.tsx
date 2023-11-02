import { IApiStatusList } from '@/types/Api';
import { NextPage, GetServerSideProps } from 'next';
import { getApiStatus } from '@/utils/axios/api';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const ApiStatus: NextPage = () => {
  const { data: apiStatus } = useQuery<IApiStatusList>('apiStatus', getApiStatus);
  console.log(apiStatus, 'apistatus');
  if (apiStatus === undefined) {
    return null;
  }
  return <div>API 상태페이지</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  const apiStatus = await getApiStatus();
  queryClient.setQueryData('apiStatus', apiStatus);
  await queryClient.prefetchQuery('apiStatus', () => Promise.resolve(apiStatus));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ApiStatus;

// export default function ApiStatus() {
//   return <div>API 상태 페이지</div>;
// }
