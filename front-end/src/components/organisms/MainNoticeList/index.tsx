import React from 'react';
import { useQuery } from 'react-query';
import { getReceiveList } from '@/utils/axios/notice';
import { TNoticeList } from '@/types/Notice';
import MainNotice from '@/components/atoms/MainNotice';
import BorderCard from '@/components/atoms/BorderCard';

function MainNoticeList() {
  const { data: noticeList } = useQuery<TNoticeList>('noticeList', async () => {
    const result = await getReceiveList({ page: 0, size: 6 });
    return result;
  });

  if (noticeList === undefined) {
    return null;
  }

  return (
    <div className="w-full">
      <BorderCard>
        {noticeList && noticeList.content.length !== 0 ? (
          noticeList.content?.map((notice, index) => (
            <div key={notice.noticeId}>
              <MainNotice notice={notice} />
              {noticeList && index !== noticeList.content.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-40">쪽지가 없습니다</div>
        )}
      </BorderCard>
    </div>
  );
}

export default MainNoticeList;
