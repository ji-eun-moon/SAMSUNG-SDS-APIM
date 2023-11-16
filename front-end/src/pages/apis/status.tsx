import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { IApiStatusInfo } from '@/types/Api';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import StatusSideBar from '@/components/organisms/StatusSideBar';
import StatusExplain from '@/components/organisms/StatusExplain';
import StatusBox from '@/components/organisms/StatusBox';
import StyledPagination from '@/components/atoms/StyledPagination';
import { getApiStatus } from '@/utils/axios/api';
import { useQuery } from 'react-query';

const ApiStatus: NextPage = () => {
  const router = useRouter();
  const filter = Array.isArray(router.query.filter) ? router.query.filter[0] : router.query.filter;
  const searchQuery = router.query.query;
  const [searchWord, setSearchWord] = useState('');
  const [clickPage, setClickPage] = useState(1);
  const { data: apiStatus } = useQuery<IApiStatusInfo>(['apiStatus', filter, clickPage, searchQuery], async () => {
    if (filter === undefined) {
      const result = await getApiStatus({ status: '', page: clickPage - 1, size: 5, apiName: searchWord });
      return result;
    }
    const result = await getApiStatus({ status: filter, page: clickPage - 1, size: 5, apiName: searchWord });
    return result;
  });

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
        <StatusBox statusList={apiStatus.content} searchWord={searchWord} changeSearchWord={setSearchWord} />
        <div className="flex justify-center mt-4">
          <StyledPagination totalPage={apiStatus.totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
        </div>
      </div>
    </BothLayout>
  );
};

export default ApiStatus;
