import { useState } from 'react';
import { useQuery } from 'react-query';
import StyledPagination from '@/components/atoms/StyledPagination';
import { getUnreadReceiveNotice } from '@/utils/axios/notice';
import { TNoticeList } from '@/types/Notice';
import Image from 'next/image';
import Link from 'next/link';
import Notice from '../Notice';

function NavBarNotice() {
  const [clickPage, setClickPage] = useState(1);
  const { data: unreadReceiveList } = useQuery<TNoticeList>(['unreadReceiveList', clickPage - 1], async () => {
    const result = await getUnreadReceiveNotice({ page: clickPage - 1, size: 5 });
    return result;
  });

  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  if (!unreadReceiveList) {
    return null;
  }

  return (
    <div className="p-2">
      <Link href="/notice/receive" className="flex justify-start my-2 ml-2">
        <div className="flex gap-2 cursor-pointer">
          <Image src="/icons/notice.png" alt="쪽지함" width={20} height={20} />
          <div className="itdaBlue font-base hover:font-bold">쪽지함 가기</div>
        </div>
      </Link>
      {unreadReceiveList.content.length === 0 ? (
        <div className="text-center itdaSecondary my-5">새로운 쪽지가 없습니다.</div>
      ) : (
        unreadReceiveList.content.map((notice, index) => (
          <div key={notice.noticeId}>
            <Notice position="nav" type="receive" noticeInfo={notice} />
            {unreadReceiveList && index !== unreadReceiveList.content.length - 1 && <hr />}
          </div>
        ))
      )}
      <div className="flex justify-center mt-4">
        <StyledPagination
          totalPage={unreadReceiveList.totalPages}
          clickPage={clickPage}
          onClickPage={handlePageClick}
        />
      </div>
    </div>
  );
}

export default NavBarNotice;
