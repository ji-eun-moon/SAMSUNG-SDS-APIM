// import { useState } from 'react';
import { INotice } from '@/types/Notice';
// import Modal from '@/components/organisms/Modal';
// import NoticeDetail from '@/components/organisms/NoticeDetail';
// import { IReceiveNoticeDetail } from '@/types/props/NoticeDetailProps';

interface MainNoticeProps {
  // notice: IReceiveNoticeDetail;
  notice: INotice;
}

function MainNotice({ notice }: MainNoticeProps) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const onModalHandler = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const truncateText = (text: string) => {
    if (text?.length <= 20) {
      return text;
    }
    return `${text?.substring(0, 20)}...`;
  };

  return (
    <div>
      <button type="button" className="w-full flex justify-between text-sm">
        <div className="text-start">{truncateText(notice.title)}</div>
        <div className="itdaSecondary">{formatDate(notice.createdAt)}</div>
      </button>

      {/* {isModalOpen && (
        <Modal type="server" onClose={onModalHandler}>
          <NoticeDetail type="receive" notice={notice} />
        </Modal>
      )} */}
    </div>
  );
}

export default MainNotice;
