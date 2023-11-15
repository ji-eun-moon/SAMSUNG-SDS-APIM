import React, { useState } from 'react';
import { INotice, INoticeDetail } from '@/types/Notice';
import Modal from '@/components/organisms/Modal';
import NoticeDetail from '@/components/organisms/NoticeDetail';
import { getReceiveNoticeDetail } from '@/utils/axios/notice';
import styles from '@/components/organisms/UserMainBox/UserMainBox.module.scss';
import { Progress } from '@nextui-org/react';

interface MainNoticeProps {
  notice: INotice;
}

function MainNotice({ notice }: MainNoticeProps) {
  const [value, setValue] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noticeDetail, setNoticeDetail] = useState<INoticeDetail | null>(null);

  const onModalCloseHandler = () => {
    setIsModalOpen(false);
    setValue(0);
  };

  const onModalOpenHandler = async () => {
    const result = await getReceiveNoticeDetail(notice.noticeId);
    setNoticeDetail(result);
    setIsModalOpen(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setValue(0);
    }, 5000);
  };

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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 5 ? 1 : v + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [value]);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const clearIntervalAndStartNew = () => {
      clearInterval(intervalId);
      setValue(1);
      // startInterval();
    };

    clearIntervalAndStartNew();

    return () => {
      clearInterval(intervalId);
    };
  }, [isModalOpen]);

  return (
    <div>
      <button
        type="button"
        onClick={() => onModalOpenHandler()}
        className={`w-full flex justify-between text-sm ${styles.hoverEffect}`}
      >
        <div className="text-start">{truncateText(notice.title)}</div>
        <div className="itdaSecondary">{formatDate(notice.createdAt)}</div>
      </button>

      {isModalOpen && (
        <div>
          <Modal type="progress" onClose={onModalCloseHandler}>
            <Progress
              aria-label="timer"
              size="sm"
              value={value}
              maxValue={5}
              formatOptions={{ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }}
              color="primary"
              // showValueLabel
              className="max-w-md"
            />
            <NoticeDetail type="main" notice={noticeDetail} />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default MainNotice;
