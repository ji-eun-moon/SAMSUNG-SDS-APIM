import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProfileImg from '@/components/atoms/ProfileImg';
import { NoticeDetailProps, SendNoticeProps, ReceiveNoticeProps } from '@/types/props/NoticeDetailProps';
import ShadowCard from '@/components/atoms/ShadowCard';
import BorderCard from '@/components/atoms/BorderCard';
import StyledButton from '@/components/atoms/StyledButton';
import NoticeSendBox from '../NoticeSendBox';
import Modal from '../Modal';

function NoticeDetail({ type, ...props }: NoticeDetailProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatToCustomDate = (dateString: string): string => {
    const daysOfWeek: string[] = ['일', '월', '화', '수', '목', '금', '토'];

    const date = new Date(dateString);
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const dayOfWeek: string = daysOfWeek[date.getDay()];
    const hours: number = date.getHours();
    const minutes: string = String(date.getMinutes()).padStart(2, '0');

    const ampm: string = hours >= 12 ? '오후' : '오전';
    const formattedHours: number = hours % 12 || 12;

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${ampm} ${formattedHours}:${minutes}`;
  };

  if (type === 'receive') {
    const { notice } = props as ReceiveNoticeProps;
    return (
      <ShadowCard type="noShadow">
        <div className="w-full p-5">
          <div className="text-xl font-bold mb-5">{notice?.title}</div>
          <div className="flex justify-between items-baseline mb-3">
            <div className="flex items-center mb-3 mx-1">
              {/* <div className="mr-3 font-semibold">보낸사람</div> */}
              {notice && <ProfileImg src={notice?.senderImage} width={38} height={38} />}
              <div className="flex flex-col">
                <div className="mx-3">{notice?.senderName}</div>
                <div className="flex text-sm itdaSecondary mx-3">
                  <div>{notice?.senderDepartment}</div>&nbsp;|&nbsp;
                  <div>{notice?.senderPosition}</div>
                </div>
              </div>
            </div>
            <div className="itdaSecondary">{notice && formatToCustomDate(notice?.createdAt)}</div>
          </div>
          <BorderCard>
            <div className="text-start p-1" style={{ height: '270px' }}>
              {notice?.content}
            </div>
          </BorderCard>
          <div className="w-full flex justify-end">
            <div className="mt-3 w-2/12 flex">
              <StyledButton variant="solid" label="답장 보내기" radius="sm" type="button" onClick={onModalHandler} />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <Modal type="server" onClose={onModalHandler}>
            <NoticeSendBox
              sendName={notice?.senderName}
              sendId={notice?.senderEmployeeId.toString()}
              onSendBoxClose={onModalHandler}
            />
          </Modal>
        )}
      </ShadowCard>
    );
  }

  if (type === 'send') {
    const { notice } = props as SendNoticeProps;
    return (
      <ShadowCard type="big">
        <div className="w-full p-5">
          <div className="text-xl font-bold mb-5">{notice?.title}</div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center mb-3 mx-1">
              {notice && <ProfileImg src={notice?.receiverImage} width={35} height={35} />}
              <div className="mx-3">{notice?.receiverName}</div>
              <div className="flex text-sm itdaSecondary">
                <div>{notice?.receiverDepartment}</div>&nbsp;|&nbsp;
                <div>{notice?.receiverPosition}</div>
              </div>
            </div>
            <div className="flex itdaSecondary">{notice && formatToCustomDate(notice?.createdAt)}</div>
          </div>
          <BorderCard>
            <div className="text-start p-1" style={{ height: '200px' }}>
              {notice?.content}
            </div>
          </BorderCard>
          <div className="w-full flex justify-end">
            <div className="mt-3 w-2/12 flex">
              <StyledButton variant="solid" label="쪽지 보내기" radius="sm" type="button" onClick={onModalHandler} />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <Modal type="server" onClose={onModalHandler}>
            <NoticeSendBox
              sendName={notice.receiverName}
              sendId={notice.receiverEmployeeId.toString()}
              onSendBoxClose={onModalHandler}
            />
          </Modal>
        )}
      </ShadowCard>
    );
  }

  if (type === 'main') {
    const { notice } = props as ReceiveNoticeProps;
    return (
      <ShadowCard type="noShadow">
        <div className="p-5" style={{ width: '30vw' }}>
          <div className="text-xl font-bold mb-5 text-start">{notice?.title}</div>
          <div className="flex justify-between items-baseline mb-3">
            <div className="flex items-center mx-1">
              {notice && <ProfileImg src={notice?.senderImage} width={35} height={35} />}
              <div className="flex flex-col">
                <div className="text-start text-sm font-medium itdaText mx-3">{notice?.senderName}</div>
                <div className="mx-3 flex text-sm itdaSecondary">
                  <div>{notice?.senderDepartment}</div>&nbsp;|&nbsp;
                  <div>{notice?.senderPosition}</div>
                </div>
              </div>
            </div>
            <div className="itdaSecondary text-start text-sm">{notice && formatToCustomDate(notice?.createdAt)}</div>
          </div>
          <BorderCard>
            <div className="text-start p-1" style={{ height: '200px' }}>
              {notice?.content}
            </div>
          </BorderCard>
          <div className="w-full flex justify-end">
            <div className="mt-3 w-3/12 flex">
              <StyledButton
                variant="solid"
                label="쪽지함 가기"
                radius="sm"
                type="button"
                onClick={() => router.push('/notice/receive')}
              />
            </div>
          </div>
        </div>
      </ShadowCard>
    );
  }
}

export default NoticeDetail;
