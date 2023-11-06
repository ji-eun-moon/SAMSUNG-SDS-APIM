import CountBadge from '.';

export default {
  title: 'atoms/CountBadge',
  tags: ['autodocs'],
  component: CountBadge,
  argTypes: {
    count: {
      description: '카운트 수',
    },
    children: {
      description: 'Badge를 달 컴포넌트',
    },
  },
};

export const Example = {
  args: {
    count: '5',
  },
};
