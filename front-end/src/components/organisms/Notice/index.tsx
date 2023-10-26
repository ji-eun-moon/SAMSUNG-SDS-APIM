import React from 'react';
import ProfileImg from '@/components/atoms/ProfileImg';
import { Checkbox } from '@nextui-org/react';
import { NoticeProps } from '@/types/props/NoticeProps';

function Notice(props: NoticeProps) {
  const { noticeInfo, onClick, isSelected, onCheckboxToggle } = props;
  const { fromImgUrl } = noticeInfo.from[0];
  const { fromName } = noticeInfo.from[0];

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <button type="button" onClick={onClick} className="w-full p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Checkbox color="default" isSelected={isSelected} onChange={onCheckboxToggle} className="mr-2" />
          <ProfileImg width={60} height={60} src={fromImgUrl} />
          <div className="flex flex-col pl-3 justify-start">
            <div className="text-left font-semibold pb-2">{fromName}</div>
            <div className="text-sm">{noticeInfo.title}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-right pb-2">{formatDate(noticeInfo.createdAt)}</div>
          <div className="itdaBlue text-sm text-right">{noticeInfo.check ? '읽음' : '안읽음'}</div>
        </div>
      </div>
    </button>
  );
}

export default Notice;
