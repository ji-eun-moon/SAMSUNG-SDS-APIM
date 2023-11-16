import TeamTable from '.';

export default {
  title: 'atoms/TeamTable',
  tags: ['autodocs'],
  component: TeamTable,
  argTypes: {
    team: {
      description: '현재 팀 정보를 넣어줍니다.',
    },
  },
};

export const DefaultColTable = {
  args: {},
};
