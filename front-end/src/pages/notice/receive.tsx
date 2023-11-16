import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
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
// import styles from '@/components/templates/TopLayout/TopLayout.module.scss';
import BothLayout from '@/components/templates/BothLayout';
import NoticeSideBar from '@/components/organisms/NoticeSideBar';
import GoBack from '@/components/atoms/GoBack';
import style from '@/styles/ProvideList.module.scss';

const ReceiveList: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [clickPage, setClickPage] = useState(1);
  const [category, setCategory] = useState('전체보기');
  const [totalPages, setTotalPages] = useState(1);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [receiveItems, setReceiveItems] = useState<INotice[] | null>(null);

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
    setCheckedItems([]);
  };

  const onClickHandler = async (item: string) => {
    setCategory(item);
    setClickPage(1);
    if (item === '전체보기') {
      router.push('/notice/receive');
    }
    if (item === '안 읽은 쪽지') {
      router.push('/notice/receive?filter=unread');
    }
    if (item === '읽은 쪽지') {
      router.push('/notice/receive?filter=read');
    }
  };

  const { mutate: deleteNotice } = useMutation(deleteReceiveNotice, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['receiveList', category, clickPage]);
      setCheckedItems([]);
    },
  });

  const { mutate: updateNotice } = useMutation(updateNoticeRead, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['receiveList', category, clickPage]);
      setCheckedItems([]);
    },
  });

  const selectDelete = async (items: number[]) => {
    await deleteNotice(items);
  };

  const selectRead = async (items: number[]) => {
    await updateNotice(items);
  };

  if (receiveList === undefined) {
    return null;
  }

  return (
    <BothLayout>
      <NoticeSideBar />
      <div className={`${style.listContainer}`}>
        <div className={`${style.label}`}>
          <GoBack label="받은 쪽지" />
        </div>
        {/* <NoticeCategory select="receive" /> */}
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
        <StyledPagination totalPage={totalPages} clickPage={clickPage} onClickPage={handlePageClick} />
      </div>
    </BothLayout>
  );
};

export default ReceiveList;
