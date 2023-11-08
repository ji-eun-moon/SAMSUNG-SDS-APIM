import NoticeCategory from '.';

export default {
  title: 'atoms/NoticeCategory',
  tags: ['autodocs'],
  component: NoticeCategory,
  argTypes: {
    select: {
      description: '"receive"와 "send" 중 골라 값을 설정합니다.',
    },
  },
};

export const Send = {
  args: {
    select: 'send',
  },
};

export const Receive = {
  args: {
    select: 'receive',
  },
};
