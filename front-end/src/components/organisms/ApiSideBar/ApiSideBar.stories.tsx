import SideBar from '.';

export default {
  title: 'organisms/ApiSideBar',
  tags: ['autodocs'],
  component: SideBar,
  argTypes: {
    my: {
      description: 'myAPI를 보여줄 것인지 여부',
    },
    openCategory: {
      description: '열어 놓을 카테고리의 id',
    },
    categoryList: {
      description: '카테고리 전체 리스트, my = false 일 때 필수 값',
    },
    useCategoryList: {
      description: '사용 중인 카테고리 전체 리스트, my = true 일 때 필수 값',
    },
    provideCategoryList: {
      description: '제공 중인 카테고리 전체 리스트, my = true 일 때 필수 값',
    },
  },
};

export const ApiSideBar = {
  args: {
    my: false,
    openCategory: 1,
    categoryList: [
      {
        categoryName: '지도',
        categoryId: 1,
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

export const MyApiSideBar = {
  args: {
    my: true,
    openCategory: 1,
    useCategoryList: [
      {
        categoryName: '지도',
        categoryId: 1,
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
        apiList: [
          { apiName: '다음 문장 만들기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 9 },
          { apiName: '문장 분류하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 10 },
          { apiName: '뉴스 한 줄 요약하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 11 },
          { apiName: '질문에 답변하기', apiAddress: 'https://dapi.kakao.com/v2/search/web', apiId: 12 },
        ],
      },
    ],
    provideCategoryList: [
      {
        categoryName: '지도',
        categoryId: 1,
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
