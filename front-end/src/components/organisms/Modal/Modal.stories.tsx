import Modal from '.';

export default {
  title: 'stories/Modal',
  tags: ['autodocs'],
  component: Modal,
  argTypes: {
    type: {
      description: '모달 유형 선택',
    },
    alertMessage: {
      description: '`type = "alert"`일 경우 출력되는 메시지',
    },
    onClose: {
      description: '모달 창 닫는 함수',
    },
    confirmMessage: {
      description: '`type = "confirm"`일 경우 출력되는 메시지',
    },
    title: {
      description: '`type = "custom"`일 경우 모달 title',
    },
    buttonLabel: {
      description: '`type = "custom"`일 경우 custom button',
    },
    onButton: {
      description: 'button 누르면 동작하는 함수',
    },
  },
};

export const AlertModal = {
  args: {
    type: 'alert',
    alertMessage: '제공신청이 완료되었습니다.',
  },
};

export const ConfirmModal = {
  args: {
    type: 'confirm',
    confirmMessage: '제공신청 하시겠습니까?',
  },
};

export const CustomModal = {
  args: {
    type: 'custom',
    buttonLabel: '쪽지 보내기',
    title: '모달 내용 예시',
    children: (
      <div>
        <div>제목: </div>
        <div>받는사람: </div>
        <div>내용: </div>
      </div>
    ),
  },
};
