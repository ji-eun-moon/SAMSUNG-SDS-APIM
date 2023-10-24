import ColTable from '.';

export default {
  title: 'stories/ColTable',
  tags: ['autodocs'],
  component: ColTable,
  argTypes: {
    headerContent: {
      description: '표 헤더 내용을 가져옵니다.',
    },
    bodyContent: {
      description: '표 바디 내용을 가져옵니다.',
    },
  },
};

export const DefaultColTable = {
  args: {
    headerContent: ['이름', '나이', '성별'],
    bodyContent: [
      {
        이름: '박서희',
        성별: '여',
        나이: 25,
      },
      {
        이름: '송아람',
        성별: '여',
        나이: 20,
      },
      {
        이름: '이찬웅',
        성별: '남',
        나이: 26,
      },
    ],
  },
};
