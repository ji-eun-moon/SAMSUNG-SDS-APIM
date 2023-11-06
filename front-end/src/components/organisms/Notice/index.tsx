import React from 'react';
import ProfileImg from '@/components/atoms/ProfileImg';
import { Checkbox } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { NoticeProps, PageNoticeProps, NavBarNoticeProps } from '@/types/props/NoticeListProps';
// import { getNoticeDetail } from '@/utils/axios/notice';
// import Modal from '@/components/organisms/Modal';
// import NoticeDetail from '@/components/organisms/NoticeDetail';

function Notice({ position, type, ...props }: NoticeProps) {
  const router = useRouter();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  if (position === 'page') {
    const { noticeInfo, isSelected, onCheckboxToggle } = props as PageNoticeProps;
    return (
      <div>
        <button
          type="button"
          onClick={() => router.push(`/notice/${type}/${noticeInfo.noticeId}`)}
          className="w-full p-2"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox color="default" isSelected={isSelected} onChange={onCheckboxToggle} className="mr-2" />
              <ProfileImg width={60} height={60} src={noticeInfo.senderImage} />
              <div className="flex flex-col pl-3 justify-start">
                <div className="text-left font-semibold pb-2">{noticeInfo.senderName}</div>
                <div className="text-sm">{noticeInfo.title}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-right pb-2">{formatDate(noticeInfo.createdAt)}</div>
              <div className="itdaBlue text-sm text-right">{noticeInfo.read ? '읽음' : '안읽음'}</div>
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
          className="w-full p-2"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ProfileImg width={60} height={60} src={noticeInfo.senderImage} />
              <div className="flex flex-col pl-3 justify-start">
                <div className="text-left font-semibold pb-2">{noticeInfo.senderName}</div>
                <div className="text-sm">{noticeInfo.title}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-right pb-2">{formatDate(noticeInfo.createdAt)}</div>
              <div className="itdaBlue text-sm text-right">{noticeInfo.read ? '읽음' : '안읽음'}</div>
            </div>
          </div>
        </button>
      </div>
    );
  }
}

export default Notice;
