import StatusTitle from '.';

export default {
  title: 'atoms/StatusTitle',
  tags: ['autodocs'],
  component: StatusTitle,
  argTypes: {
    apiName: {
      description: 'API 이름을 넣어줍니다.',
    },
    apiAddress: {
      description: 'API 주소를 넣어줍니다.',
    },
    apiId: {
      description: '상세페이지 이동에 필요한 API ID를 넣어줍니다.',
    },
  },
};

export const StatusTableEx = {
  args: {
    apiName: '이미지 검색하기',
    apiAddress: 'https://k9c201.p.ssafy.io',
    apiId: 1,
  },
};
