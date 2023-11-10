// import { useState } from 'react';
import { INotice } from '@/types/Notice';
// import Modal from '@/components/organisms/Modal';
// import NoticeDetail from '@/components/organisms/NoticeDetail';

interface MainNoticeProps {
  notice: INotice;
}

function MainNotice({ notice }: MainNoticeProps) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const truncateText = (text: string) => {
    if (text.length <= 20) {
      return text;
    }
    return `${text.substring(0, 20)}...`;
  };

  return (
    <div className="w-full flex justify-between text-sm">
      <div className="text-start">{truncateText(notice.title)}</div>
      <div className="itdaSecondary">{formatDate(notice.createdAt)}</div>

      {/* {isModalOpen && (
        <Modal type="server">
          <NoticeDetail />
        </Modal>
      )} */}
    </div>
  );
}

export default MainNotice;
