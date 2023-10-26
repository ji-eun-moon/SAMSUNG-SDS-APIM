import BothLayout from '.';

export default {
  title: 'templates/BothLayout',
  tags: ['autodocs'],
  component: BothLayout,
  argTypes: {
    totalPage: {
      description: '페이지의 총 길이',
    },
    currentPage: {
      description: '현재 페이지',
    },
  },
};

export const DefaultBothLayout = {
  args: {
    totalPage: 10,
    currentPage: 1,
  },
};
