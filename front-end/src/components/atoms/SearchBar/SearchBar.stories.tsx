import SearchBar from '.';

export default {
  title: 'atoms/SearchBar',
  tags: ['autodocs'],
  component: SearchBar,
  argTypes: {
    placeholder: {
      description: '검색어 창 placeholder',
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
    keyword: '',
    placeholder: 'API 검색',
  },
};
