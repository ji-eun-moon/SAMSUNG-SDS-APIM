import SideLayout from '.';

export default {
  title: 'templates/SideLayout',
  tags: ['autodocs'],
  component: SideLayout,
  argTypes: {
    totalPage: {
      description: '페이지의 총 길이',
    },
    currentPage: {
      description: '현재 페이지',
    },
  },
};

export const DefaultSideLayout = {
  args: {
    totalPage: 10,
    currentPage: 1,
  },
};
