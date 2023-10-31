import MemberTable from '.';

export default {
  title: 'atoms/MemberTable',
  tags: ['autodocs'],
  component: MemberTable,
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
      ['송아람', '25', '여자'],
      ['박서희', '25', '여자'],
    ],
  },
};
