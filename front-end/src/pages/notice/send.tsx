import { useState } from 'react';
import { useQuery } from 'react-query';
import { NextPage } from 'next';
import TopLayout from '@/components/templates/TopLayout';
import NoticeCategory from '@/components/atoms/NoticeCategory';
import NoticeList from '@/components/organisms/NoticeList';
import { getSendList, deleteSendNotice, getSendReadList, getSendUnreadList } from '@/utils/axios/notice';
import { TNoticeSendList, ISendNotice } from '@/types/Notice';
import StyledPagination from '@/components/atoms/StyledPagination';

const SendList: NextPage = () => {
  const [clickPage, setClickPage] = useState(1);
  const [category, setCategory] = useState('전체보기');
  const [totalPages, setTotalPages] = useState(1);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [sendItems, setSendItems] = useState<ISendNotice[] | null>(null);

  const { data: sendList } = useQuery<TNoticeSendList>(['sendList', category, clickPage], async () => {
    if (category === '전체보기') {
      const result = await getSendList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setSendItems(result.content);
      return result;
    }
    if (category === '안 읽은 쪽지') {
      const result = await getSendUnreadList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setSendItems(result.content);
      return result;
    }
    const result = await getSendReadList({ page: clickPage - 1, size: 6 });
    setTotalPages(result.totalPages);
    setSendItems(result.content);
    return result;
  });

  const onClickHandler = async (item: string) => {
    setCategory(item);
    setClickPage(1);

    if (item === '전체보기') {
      const result = await getSendList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setSendItems(result.content);
    }
    if (item === '안 읽은 쪽지') {
      const result = await getSendUnreadList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setSendItems(result.content);
    }
    if (item === '읽은 쪽지') {
      const result = await getSendReadList({ page: clickPage - 1, size: 6 });
      setTotalPages(result.totalPages);
      setSendItems(result.content);
    }
  };

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  const selectDelete = async (items: number[]) => {
    const res = await deleteSendNotice(items);
    if (res === '삭제 완료') {
      setCheckedItems([]);
      onClickHandler(category);
    }
  };

  if (sendList === undefined) {
    return null;
  }

  return (
    <TopLayout>
      <div style={{ margin: '30px 200px' }}>
        <NoticeCategory select="send" />
        <NoticeList
          type="send"
          noticeList={sendItems}
          checkedItems={checkedItems}
          category={category}
          onClickHandler={(item: string) => onClickHandler(item)}
          setCheckedItems={(list: number[]) => setCheckedItems(list)}
          selectDelete={(list: number[]) => selectDelete(list)}
        />
        <div className="flex justify-center mt-4">
          <StyledPagination totalPage={totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
        </div>
      </div>
    </TopLayout>
  );
};

export default SendList;
