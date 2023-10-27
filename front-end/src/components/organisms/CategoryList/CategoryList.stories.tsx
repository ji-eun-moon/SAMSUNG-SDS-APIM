import CategoryList from '.';

export default {
  title: 'organisms/CategoryList',
  tags: ['autodocs'],
  component: CategoryList,
  argTypes: {
    openCategory: {
      description: '열어 놓을 카테고리의 id를 입력합니다. (categoryList의 첫번째 값)',
    },
    categoryList: {
      description: '카테고리 리스트',
    },
  },
};

export const Example = {
  args: {
    openCategory: 1,
    categoryList: [
      {
        categoryName: '지도',
        categoryId: 1,
        isOpen: false,
        apiList: [
          { apiName: '주소 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 1 },
          { apiName: '카테고리 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 2 },
          { apiName: '키워드 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 3 },
          { apiName: '좌표로 주소 변환하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 4 },
        ],
      },

      {
        categoryName: 'Daum 검색하기',
        categoryId: 2,
        isOpen: false,
        apiList: [
          { apiName: '웹문서 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 5 },
          { apiName: '동영상 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 6 },
          { apiName: '이미지 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 7 },
          { apiName: '블로그 검색하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 8 },
        ],
      },

      {
        categoryName: 'KoGPT에게 요청하기',
        categoryId: 3,
        isOpen: false,
        apiList: [
          { apiName: '다음 문장 만들기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 9 },
          { apiName: '문장 분류하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 10 },
          { apiName: '뉴스 한 줄 요약하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 11 },
          { apiName: '질문에 답변하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 12 },
        ],
      },
    ],
  },
};
