import Image from 'next/image';
import Modal from '@/components/organisms/Modal';
import { useState } from 'react';

interface CopyProps {
  copyText: string;
}

function Copy({ copyText }: CopyProps) {
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setModalMessage('클립보드에 복사되었습니다.');
      setIsModalOpen(true);
    } catch (error) {
      setModalMessage('복사 실패');
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      {isModalOpen && <Modal type="alert" alertMessage={modalMessage} onClose={closeModal} />}
      <Image
        src="/icons/copy.png"
        alt="copy icon"
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={() => handleCopyClipBoard(copyText)}
      />
    </div>
  );
}

export default Copy;
