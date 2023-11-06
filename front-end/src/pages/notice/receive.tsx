import { useState } from 'react';
import { useQuery } from 'react-query';
import { NextPage } from 'next';
import SideLayout from '@/components/templates/SideLayout';
import GoBack from '@/components/atoms/GoBack';
import NoticeCategory from '@/components/atoms/NoticeCategory';
import NoticeList from '@/components/organisms/NoticeList';
import { getReceiveList, updateNoticeRead, deleteReceiveNotice } from '@/utils/axios/notice';
import { TNoticeList, INotice } from '@/types/Notice';
import StyledPagination from '@/components/atoms/StyledPagination';

const ReceiveList: NextPage = () => {
  const [clickPage, setClickPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [receiveItems, setReceiveItems] = useState<INotice[] | null>(null);

  const { data: receiveList } = useQuery<TNoticeList>(`receiveList ${clickPage}`, async () => {
    const result = await getReceiveList({ page: clickPage - 1, size: 6 });
    setReceiveItems(result.content);
    return result;
  });
  
  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };
  
  const selectDelete = async (checkedItems: number[]) => {
    deleteReceiveNotice(checkedItems);
    setCheckedItems([]);
    const result = await getReceiveList({ page: clickPage - 1, size: 6 });
    setReceiveItems(result.content);
  };
  
  const selectRead = async (checkedItems: number[]) => {
    updateNoticeRead(checkedItems);
    setCheckedItems([]);
    const result = await getReceiveList({ page: clickPage - 1, size: 6 });
    setReceiveItems(result.content);
  };
  
  if (receiveList === undefined) {
    return null;
  }

  return (
    <SideLayout>
      <div>
        <GoBack label="쪽지함" />
        <NoticeCategory select="receive" />
        <NoticeList
          noticeList={receiveItems}
          checkedItems={checkedItems}
          setCheckedItems={(list: number[]) => setCheckedItems(list)}
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
