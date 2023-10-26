import Category from '.';

export default {
  title: 'atoms/Category',
  tags: ['autodocs'],
  component: Category,
  argTypes: {
    categoryName: {
      description: '카테고리 이름',
    },
    categoryId: {
      description: '카테고리 아이디',
    },
    apiList: {
      description: '배열 형태의 API 리스트',
    },
    isOpen: {
      description: '리스트를 열어놓을 건지의 여부',
    },
  },
};

export const Example = {
  args: {
    categoryName: '지도',
    categoryId: 1,
    apiList: [
      { apiName: '주소 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 1 },
      { apiName: '카테고리 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 2 },
      { apiName: '키워드 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 3 },
      { apiName: '좌표로 주소 변환하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 4 },
    ],
    isOpen: true,
  },
};
