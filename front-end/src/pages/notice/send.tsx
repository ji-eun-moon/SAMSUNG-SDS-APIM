import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import GoBack from '@/components/atoms/GoBack';
import NoticeList from '@/components/organisms/NoticeList';
import { getSendList, deleteSendNotice, getSendReadList, getSendUnreadList } from '@/utils/axios/notice';
import { TNoticeSendList, ISendNotice } from '@/types/Notice';
import StyledPagination from '@/components/atoms/StyledPagination';
// import styles from '@/components/templates/TopLayout/TopLayout.module.scss';
import BothLayout from '@/components/templates/BothLayout';
import NoticeSideBar from '@/components/organisms/NoticeSideBar';

const SendList: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [clickPage, setClickPage] = useState(1);
  const [category, setCategory] = useState('전체보기');
  const [totalPages, setTotalPages] = useState(1);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [sendItems, setSendItems] = useState<ISendNotice[] | null>(null);

  useEffect(() => {
    const filter = Array.isArray(router.query.filter) ? router.query.filter[0] : router.query.filter;
    if (filter === undefined || (filter !== 'read' && filter !== 'unread')) {
      setCategory('전체보기');
    } else if (filter === 'read') {
      setCategory('읽은 쪽지');
    } else if (filter === 'unread') {
      setCategory('안 읽은 쪽지');
    }
  }, [router.query.filter, clickPage]);

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
      router.push('/notice/send');
    }
    if (item === '안 읽은 쪽지') {
      router.push('/notice/send?filter=unread');
    }
    if (item === '읽은 쪽지') {
      router.push('/notice/send?filter=read');
    }
  };

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
    setCheckedItems([]);
  };

  const { mutate: deleteNotice } = useMutation(deleteSendNotice, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['sendList', category, clickPage]);
      setCheckedItems([]);
    },
  });

  const selectDelete = async (items: number[]) => {
    await deleteNotice(items);
  };

  if (sendList === undefined) {
    return null;
  }

  return (
    <BothLayout>
      <NoticeSideBar />
      <div>
        <div className="mb-4">
          <GoBack label="보낸 쪽지" />
        </div>
        {/* <NoticeCategory select="send" /> */}
        <NoticeList
          type="send"
          category={category}
          noticeList={sendItems}
          checkedItems={checkedItems}
          onClickHandler={(item: string) => onClickHandler(item)}
          setCheckedItems={(list: number[]) => setCheckedItems(list)}
          selectDelete={(list: number[]) => selectDelete(list)}
        />
        <div className="flex justify-center mt-4">
          <StyledPagination totalPage={totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
        </div>
      </div>
    </BothLayout>
  );
};

export default SendList;
