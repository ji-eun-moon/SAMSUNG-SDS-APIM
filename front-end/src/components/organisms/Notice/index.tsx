import React from 'react';
import ProfileImg from '@/components/atoms/ProfileImg';
import { Checkbox } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { formatDate, truncateText } from '@/utils/format';
import { NoticeProps, ReceiveNoticeProps, SendNoticeProps, NavBarNoticeProps } from '@/types/props/NoticeListProps';
import styles from './Notice.module.scss';

function Notice({ position, type, ...props }: NoticeProps) {
  const router = useRouter();

  if (position === 'page' && type === 'receive') {
    const { noticeInfo, isSelected, category, onCheckboxToggle } = props as ReceiveNoticeProps;
    return (
      <div>
        <button
          type="button"
          onClick={() => router.push(`/notice/${type}/${noticeInfo.noticeId}`)}
          className={`w-full p-2 ${styles.hoverEffect}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox color="default" isSelected={isSelected} onChange={onCheckboxToggle} className="mr-2" />
              <ProfileImg width={50} height={50} src={noticeInfo.senderImage} />
              <div className="flex flex-col pl-3 justify-start">
                <div className="text-left font-semibold pb-1">{noticeInfo.senderName}</div>
                <div className="text-left text-sm">{truncateText(noticeInfo.title, 40)}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-right pb-2">{formatDate(noticeInfo.createdAt)}</div>
              <div className="itdaBlue text-sm text-right">
                {noticeInfo.read || category === '읽은 쪽지' ? '읽음' : '안읽음'}
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  if (position === 'page' && type === 'send') {
    const { noticeInfo, isSelected, category, onCheckboxToggle } = props as SendNoticeProps;
    return (
      <div>
        <button
          type="button"
          onClick={() => router.push(`/notice/${type}/${noticeInfo.noticeId}`)}
          className={`w-full p-2 ${styles.hoverEffect}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox color="default" isSelected={isSelected} onChange={onCheckboxToggle} className="mr-2" />
              <ProfileImg width={50} height={50} src={noticeInfo.receiverImage} />
              <div className="flex flex-col pl-3 justify-start">
                <div className="text-left font-semibold pb-1">{noticeInfo.receiverName}</div>
                <div className="text-left text-sm">{truncateText(noticeInfo.title, 40)}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-right pb-2">{formatDate(noticeInfo.createdAt)}</div>
              <div className="itdaBlue text-sm text-right">
                {noticeInfo.read || category === '읽은 쪽지' ? '읽음' : '안읽음'}
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  if (position === 'nav') {
    const { noticeInfo } = props as NavBarNoticeProps;
    return (
      <div>
        <button
          type="button"
          onClick={() => router.push(`/notice/${type}/${noticeInfo.noticeId}`)}
          className={`w-full p-2 ${styles.hoverEffect}`}
        >
          <div className="flex w-full">
            <div className="flex items-center w-full">
              <ProfileImg width={40} height={40} src={noticeInfo.senderImage} />
              <div className="flex-col flex w-full">
                <div className="flex pl-3 justify-between pb-1">
                  <div className="flex text-left font-semibold">{noticeInfo.senderName}</div>
                  <div className="flex text-sm text-right itdaSecondary">{formatDate(noticeInfo.createdAt)}</div>
                </div>
                <div className="flex pl-3">
                  <div className="text-sm">{truncateText(noticeInfo.title, 20)}</div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }
}

export default Notice;
