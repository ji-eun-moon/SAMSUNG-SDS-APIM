import React from 'react';
import { useRouter } from 'next/router';
import StyledButton from '@/components/atoms/StyledButton';

interface NoticeCategoryProps {
  select: 'send' | 'receive';
}

function NoticeCategory({ select }: NoticeCategoryProps) {
  const router = useRouter();

  if (select === 'send') {
    return (
      <div className="flex justify-between ml-8 mt-4 mb-2 text-lg">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.push('/notice/receive')}>
            받은 쪽지함
          </button>
          <div className="itdaSecondary">|</div>
          <button type="button" className="itdaBlue cursor-pointer" onClick={() => router.push('/notice/send')}>
            보낸 쪽지함
          </button>
        </div>
        <div>
          <StyledButton
            variant="solid"
            label="쪽지 보내기"
            radius="full"
            type="button"
            onClick={() => router.push('/notice/post')}
          />
        </div>
      </div>
    );
  }
  if (select === 'receive') {
    return (
      <div className="flex justify-between ml-8 mt-4 mb-2 text-lg">
        <div className="flex items-center gap-3">
          <button type="button" className="itdaBlue cursor-pointer" onClick={() => router.push('/notice/receive')}>
            받은 쪽지함
          </button>
          <div className="itdaSecondary">|</div>
          <button type="button" onClick={() => router.push('/notice/send')}>
            보낸 쪽지함
          </button>
        </div>
        <div className="flex">
          <StyledButton
            variant="solid"
            label="쪽지 보내기"
            radius="full"
            type="button"
            onClick={() => router.push('/notice/post')}
          />
        </div>
      </div>
    );
  }
}

export default NoticeCategory;
