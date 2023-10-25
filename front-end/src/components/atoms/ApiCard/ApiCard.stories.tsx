import ApiCard from '.';

export default {
  title: 'stories/ApiCard',
  tags: ['autodocs'],
  component: ApiCard,
  argTypes: {
    title: {
      description: 'API 이름',
    },
    category: {
      description: 'API를 검색할 경우 보이는 해당 API 카테고리',
    },
    address: {
      description: 'API 주소',
    },
    onClick: {
      description: '클릭시 API 상세 페이지로 이동',
    },
  },
};

export const Category = {
  args: {
    title: '웹문서 검색하기',
    category: 'Daum 검색하기',
    address: 'https://dapi.kakao.com/v2/search/web',
  },
};

export const NoCategory = {
  args: {
    title: '웹문서 검색하기',
    address: 'https://dapi.kakao.com/v2/search/web',
  },
};
