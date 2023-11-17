import Copy from '.';

export default {
  title: 'atoms/Copy',
  tags: ['autodocs'],
  component: Copy,
  argTypes: {
    copyText: {
      description: '복사할 텍스트',
    },
  },
};

export const Example = {
  args: {
    copyText: 'ITDA 복사 테스트',
  },
};
