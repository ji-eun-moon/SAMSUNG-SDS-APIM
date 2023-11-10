// import { useRouter } from 'next/router';
import { getStatusCount } from '@/utils/axios/api';
import { QueryClient, useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import Status from '@/components/atoms/Status';
import BorderCard from '@/components/atoms/BorderCard';

interface IApiCount {
  success: number;
  warning: number;
  error: number;
}

function ApiStatusSummary() {
  const { data: apiCount } = useQuery<IApiCount>('apiCount', getStatusCount);

  return (
    <BorderCard>
      <div className="flex gap-3">
        <div className="flex items-center">
          <Status status="정상" />
          <div className="ml-1 mr-3">정상작동</div>
          <div>{apiCount?.success}</div>
        </div>
        <div>|</div>
        <div className="flex items-center">
          <Status status="점검" />
          <div className="ml-1 mr-3">점검중</div>
          <div>{apiCount?.warning}</div>
        </div>
        <div>|</div>
        <div className="flex items-center">
          <Status status="오류" />
          <div className="ml-1 mr-3">오류발생</div>
          <div>{apiCount?.error}</div>
        </div>
      </div>
    </BorderCard>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('apiCount', getStatusCount);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ApiStatusSummary;
