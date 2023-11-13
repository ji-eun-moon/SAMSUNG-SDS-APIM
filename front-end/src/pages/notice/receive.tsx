import { useState } from 'react';
import { useQuery } from 'react-query';
import { NextPage } from 'next';
import TopLayout from '@/components/templates/TopLayout';
import NoticeCategory from '@/components/atoms/NoticeCategory';
import NoticeList from '@/components/organisms/NoticeList';
import {
  getReceiveList,
  updateNoticeRead,
  deleteReceiveNotice,
  getReceiveReadList,
  getReceiveUnreadList,
} from '@/utils/axios/notice';
import { TNoticeList, INotice } from '@/types/Notice';
import StyledPagination from '@/components/atoms/StyledPagination';

const ReceiveList: NextPage = () => {
  const [clickPage, setClickPage] = useState(1);
  const [category, setCategory] = useState('전체보기');
  const [totalPages, setTotalPages] = useState(1);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [receiveItems, setReceiveItems] = useState<INotice[] | null>(null);

  const { data: receiveList } = useQuery<TNoticeList>(['receiveList', category, clickPage], async () => {
    if (category === '전체보기') {
      const result = await getReceiveList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setReceiveItems(result.content);
      return result;
    }
    if (category === '안 읽은 쪽지') {
      const result = await getReceiveUnreadList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setReceiveItems(result.content);
      return result;
    }
    const result = await getReceiveReadList({ page: clickPage - 1, size: 6 });
    setTotalPages(result.totalPages);
    setReceiveItems(result.content);
    return result;
  });

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  const onClickHandler = async (item: string) => {
    setCategory(item);
    setClickPage(1);
    if (item === '전체보기') {
      const result = await getReceiveList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setReceiveItems(result.content);
      console.log(result.content);
    }
    if (item === '안 읽은 쪽지') {
      const result = await getReceiveUnreadList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setReceiveItems(result.content);
    }
    if (item === '읽은 쪽지') {
      const result = await getReceiveReadList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setReceiveItems(result.content);
    }
  };

  const selectDelete = async (items: number[]) => {
    const res = await deleteReceiveNotice(items);
    if (res === '삭제 완료') {
      setCheckedItems([]);
      onClickHandler(category);
    }
  };

  const selectRead = async (items: number[]) => {
    const res = await updateNoticeRead(items);
    if (res === '읽음 처리 완료') {
      setCheckedItems([]);
      onClickHandler(category);
    }
  };

  if (receiveList === undefined) {
    return null;
  }

  return (
    <TopLayout>
      <div style={{ margin: '30px 200px' }}>
        <NoticeCategory select="receive" />
        <NoticeList
          type="receive"
          category={category}
          noticeList={receiveItems}
          checkedItems={checkedItems}
          onClickHandler={(item: string) => onClickHandler(item)}
          setCheckedItems={(list: number[]) => setCheckedItems(list)}
          selectDelete={(list: number[]) => selectDelete(list)}
          selectRead={(list: number[]) => selectRead(list)}
        />
        <div className="flex justify-center mt-4">
          <StyledPagination totalPage={totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
        </div>
      </div>
    </TopLayout>
  );
};

export default ReceiveList;
