import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { IUser } from '@/types/User';
import SideBarBody from '@/components/atoms/SideBarBody';
import SideBarMenu from '@/components/atoms/SideBarMenu';
import StyledButton from '@/components/atoms/StyledButton';
import Modal from '../Modal';
import NoticeSendBox from '../NoticeSendBox';
import styles from './NoticeSideBar.module.scss';

function NoticeSideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (!userInfo) {
    return null;
  }

  const onModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const receiveCondition = [
    { conditionId: '1', title: '전체 보기', url: '/notice/receive' },
    { conditionId: '2', title: '읽은 쪽지 보기', url: '/notice/receive?filter=read' },
    { conditionId: '3', title: '안읽은 쪽지 보기', url: '/notice/receive?filter=unread' },
  ];

  const sendCondition = [
    { conditionId: '1', title: '전체 보기', url: '/notice/send' },
    { conditionId: '2', title: '읽은 쪽지 보기', url: '/notice/send?filter=read' },
    { conditionId: '3', title: '안읽은 쪽지 보기', url: '/notice/send?filter=unread' },
  ];

  return (
    <div>
      <SideBarBody>
        <div className="my-5 text-xl font-bold mx-2">쪽지함</div>
        <div className="grid grid-cols-1 content-between h-full mb-5">
          <div>
            <SideBarMenu title="받은 쪽지" conditionList={receiveCondition} />
            <SideBarMenu title="보낸 쪽지" conditionList={sendCondition} />
          </div>
          <StyledButton variant="solid" radius="full" label="쪽지 보내기" onClick={onModalHandler} type="button" />
        </div>
      </SideBarBody>
      {isModalOpen && (
        <div className={`${styles.modalContainer}`}>
          <Modal type="server" onClose={onModalHandler}>
            <NoticeSendBox onSendBoxClose={onModalHandler} />
          </Modal>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default NoticeSideBar;
