import TeamTable from '.';

export default {
  title: 'atoms/TeamTable',
  tags: ['autodocs'],
  component: TeamTable,
  argTypes: {
    memberList: {
      description: '표 내용에 들어갈 멤버리스트를 넣어줍니다.',
    },
  },
};

export const DefaultColTable = {
  args: {},
};
