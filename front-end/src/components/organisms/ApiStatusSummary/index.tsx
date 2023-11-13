import { useState, useEffect } from 'react';
import { getStatusCount } from '@/utils/axios/api';
import { QueryClient, useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import Status from '@/components/atoms/Status';
import styles from '@/components/organisms/UserMainBox/UserMainBox.module.scss';

interface IApiCount {
  success: number;
  warning: number;
  error: number;
}

interface ApiStatusSummaryProps {
  onClickHandler: (item: string) => void;
}

function ApiStatusSummary({ onClickHandler }: ApiStatusSummaryProps) {
  const [all, setAll] = useState(0);
  const { data: apiCount } = useQuery<IApiCount>('apiCount', getStatusCount);
  useEffect(() => {
    if (apiCount !== undefined) {
      const successCount = apiCount.success ?? 0;
      const warningCount = apiCount.warning ?? 0;
      const errorCount = apiCount.error ?? 0;

      setAll(successCount + warningCount + errorCount);
    }
  }, [apiCount]);

  return (
    <div className={`${styles.apiSummaryBox} border-1 text-sm`}>
      <div className="flex items-center justify-between">
        <button type="button" className="flex items-center" onClick={() => onClickHandler('전체')}>
          <div className={`ml-1 ${styles.statusCategory}`}>전체 API</div>
          <div className="ml-3">{all}건</div>
        </button>
        <div className="flex gap-1 justify-center items-center">
          <button type="button" className="flex items-center" onClick={() => onClickHandler('정상')}>
            <Status status="정상" size="small" />
            <div className={`ml-1 mr-3 ${styles.statusCategory}`}>정상작동</div>
            <div>{apiCount?.success}</div>
          </button>
          <div>&nbsp;|&nbsp;</div>
          <button type="button" className="flex items-center" onClick={() => onClickHandler('점검')}>
            <Status status="점검" size="small" />
            <div className={`ml-1 mr-3 ${styles.statusCategory}`}>점검중</div>
            <div>{apiCount?.warning}</div>
          </button>
          <div>&nbsp;|&nbsp;</div>
          <button type="button" className="flex items-center" onClick={() => onClickHandler('오류')}>
            <Status status="오류" size="small" />
            <div className={`ml-1 mr-3 ${styles.statusCategory}`}>오류발생</div>
            <div>{apiCount?.error}</div>
          </button>
        </div>
      </div>
    </div>
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
