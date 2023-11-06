import React from 'react';
import { useRouter } from 'next/router';

interface NoticeCategoryProps {
  select: 'send' | 'receive';
}

function NoticeCategory({ select }: NoticeCategoryProps) {
  const router = useRouter();
  if (select === 'send') {
    return (
      <div className="flex ml-8 mt-4 mb-2 text-lg gap-3">
        <button type="button" onClick={() => router.push('/notice/receive')}>
          받은 쪽지함
        </button>
        <div className="itdaSecondary">|</div>
        <div className="itdaBlue cursor-pointer" onClick={() => router.push('/notice/send')}>
          보낸 쪽지함
        </div>
      </div>
    );
  }
  if (select === 'receive') {
    return (
      <div className="flex ml-8 mt-4 mb-2 text-lg gap-3">
        <div className="itdaBlue cursor-pointer" onClick={() => router.push('/notice/receive')}>
          받은 쪽지함
        </div>
        <div className="itdaSecondary">|</div>
        <button type="button" onClick={() => router.push('/notice/send')}>
          보낸 쪽지함
        </button>
      </div>
    );
  }
}

export default NoticeCategory;
