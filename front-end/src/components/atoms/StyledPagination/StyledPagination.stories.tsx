import StyledPagination from '.';

export default {
  title: 'atoms/StyledPagination',
  tags: ['autodocs'],
  component: StyledPagination,
  argTypes: {
    totalPage: {
      description: '페이지의 총 길이',
    },
    currentPage: {
      description: '현재 페이지',
    },
  },
};

export const DefaultStyledPagination = {
  args: {
    totalPage: 10,
    currentPage: 1,
  },
};
