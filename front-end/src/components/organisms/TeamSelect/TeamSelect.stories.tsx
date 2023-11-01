import TeamSelect from '.';

export default {
  title: 'organisms/TeamSelect',
  tags: ['autodocs'],
  component: TeamSelect,
  argTypes: {
    list: {
      description: 'SelectBox에 들어갈 리스트 데이터를 넣어줍니다.',
    },
  },
};

export const TeamSelectEx = {
  args: {
    list: ['project1', 'project2', 'project3'],
  },
};
