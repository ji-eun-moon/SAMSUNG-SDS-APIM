import SearchBar from '.';

export default {
  title: 'stories/SearchBar',
  tags: ['autodocs'],
  component: SearchBar,
  argTypes: {
    width: {
      description: '검색창 길이를 지정합니다',
    },
    keyword: {
      description: '검색어를 받아옵니다.',
    },
    onSearchHandler: {
      description: '검색 아이콘 클릭시 동작할 함수',
    },
  },
};

export const ShortSearchBar = {
  args: {
    width: 'w-64',
    keyword: '',
  },
};
