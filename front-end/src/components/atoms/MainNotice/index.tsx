import { useState } from 'react';
import { useQuery } from 'react-query';
import { INotice, INoticeDetail } from '@/types/Notice';
import Modal from '@/components/organisms/Modal';
import NoticeDetail from '@/components/organisms/NoticeDetail';
import { getReceiveNoticeDetail } from '@/utils/axios/notice';
import styles from '@/components/organisms/UserMainBox/UserMainBox.module.scss';

interface MainNoticeProps {
  notice: INotice;
}

function MainNotice({ notice }: MainNoticeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { data: noticeDetail } = useQuery<INoticeDetail>(`noticeDetail ${notice.noticeId}`, async () => {
    const result = await getReceiveNoticeDetail(notice.noticeId);
    return result;
  });

  if (!noticeDetail) {
    return null;
  }

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
      <button
        type="button"
        onClick={() => onModalHandler()}
        className={`w-full flex justify-between text-sm ${styles.hoverEffect}`}
      >
        <div className="text-start">{truncateText(notice.title)}</div>
        <div className="itdaSecondary">{formatDate(notice.createdAt)}</div>
      </button>

      {isModalOpen && (
        <Modal type="server" onClose={onModalHandler}>
          <NoticeDetail type="main" notice={noticeDetail} />
        </Modal>
      )}
    </div>
  );
}

export default MainNotice;
