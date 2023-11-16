import React, { useState } from 'react';
import { useRouter } from 'next/router';
import StyledButton from '@/components/atoms/StyledButton';
import Modal from '@/components/organisms/Modal';
import NoticeSendBox from '@/components/organisms/NoticeSendBox';

interface NoticeCategoryProps {
  select: 'send' | 'receive';
}

function NoticeCategory({ select }: NoticeCategoryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const onModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex justify-between mb-2 text-lg">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={`cursor-pointer ${select === 'receive' ? 'itdaBlue' : ''}`}
          onClick={() => router.push('/notice/receive')}
        >
          받은 쪽지함
        </button>
        <div className="itdaSecondary">|</div>
        <button
          type="button"
          className={`cursor-pointer ${select === 'send' ? 'itdaBlue' : ''}`}
          onClick={() => router.push('/notice/send')}
        >
          보낸 쪽지함
        </button>
      </div>
      <div>
        <StyledButton variant="solid" label="쪽지 보내기" radius="full" type="button" onClick={onModalHandler} />
      </div>
      {isModalOpen && (
        <Modal type="server" onClose={onModalHandler}>
          <NoticeSendBox onSendBoxClose={onModalHandler} />
        </Modal>
      )}
    </div>
  );
}

export default NoticeCategory;
