import MainPage from '.';

export default {
  title: 'templates/MainPage',
  tags: ['autodocs'],
  component: MainPage,
  argTypes: {
    totalPage: {
      description: '페이지의 총 길이',
    },
    currentPage: {
      description: '현재 페이지',
    },
  },
};

export const DefaultMainPage = {
  args: {
    totalPage: 10,
    currentPage: 1,
  },
};
