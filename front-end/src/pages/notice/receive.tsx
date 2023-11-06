import { useState } from 'react';
import { useQuery } from 'react-query';
import { NextPage } from 'next';
import SideLayout from '@/components/templates/SideLayout';
import GoBack from '@/components/atoms/GoBack';
import NoticeCategory from '@/components/atoms/NoticeCategory';
import NoticeList from '@/components/organisms/NoticeList';
import { getReceiveList, updateNoticeRead, deleteReceiveNotice } from '@/utils/axios/notice';
import { TNoticeList } from '@/types/Notice';
import StyledPagination from '@/components/atoms/StyledPagination';

const ReceiveList: NextPage = () => {
  const [clickPage, setClickPage] = useState(1);

  const { data: receiveList } = useQuery<TNoticeList>(`receiveList ${clickPage}`, async () => {
    const result = await getReceiveList({ page: clickPage - 1, size: 5 });
    return result;
  });

  if (receiveList === undefined) {
    return null;
  }

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  const selectDelete = (checkedItems: number[]) => {
    deleteReceiveNotice(checkedItems);
  };

  const selectRead = (checkedItems: number[]) => {
    updateNoticeRead(checkedItems);
  };

  return (
    <SideLayout>
      <div>
        <GoBack label="쪽지함" />
        <NoticeCategory select="receive" />
        <NoticeList
          noticeList={receiveList.content}
          selectDelete={(list: number[]) => selectDelete(list)}
          selectRead={(list: number[]) => selectRead(list)}
        />
        <div className="flex justify-center mt-4">
          <StyledPagination totalPage={receiveList.totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
        </div>
      </div>
    </SideLayout>
  );
};

export default ReceiveList;
