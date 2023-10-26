import TopLayout from '.';

export default {
  title: 'templates/TopLayout',
  tags: ['autodocs'],
  component: TopLayout,
  argTypes: {
    totalPage: {
      description: '페이지의 총 길이',
    },
    currentPage: {
      description: '현재 페이지',
    },
  },
};

export const DefaultTopLayout = {
  args: {
    totalPage: 10,
    currentPage: 1,
  },
};
