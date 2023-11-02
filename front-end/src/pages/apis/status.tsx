import { NextPage } from 'next';
import { useState } from 'react';
import { IApiStatusList } from '@/types/Api';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import StatusSideBar from '@/components/organisms/StatusSideBar';
import StatusExplain from '@/components/organisms/StatusExplain';
import StatusBox from '@/components/organisms/StatusBox';
import StyledPagination from '@/components/atoms/StyledPagination';
import { getApiStatus } from '@/utils/axios/api';
import { useQuery } from 'react-query';

const ApiStatus: NextPage = () => {
  const [clickPage, setClickPage] = useState(1);
  const { data: apiStatus } = useQuery<IApiStatusList>('apiStatus', getApiStatus);

  if (apiStatus === undefined) {
    return null;
  }

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  return (
    <BothLayout>
      <StatusSideBar />
      <div>
        <GoBack label="API 상태확인" />
        <StatusExplain />
        <StatusBox statusList={apiStatus.apiStatusResponses} />
        <div className="flex justify-center mt-5">
          <StyledPagination totalPage={apiStatus.totalPage} clickPage={clickPage} onClickPage={handlePageClick} />
        </div>
      </div>
    </BothLayout>
  );
};

export default ApiStatus;
