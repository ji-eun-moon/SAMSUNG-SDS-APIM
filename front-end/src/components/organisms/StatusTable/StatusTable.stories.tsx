import StatusTable from '.';

export default {
  title: 'atoms/StatusTable',
  tags: ['autodocs'],
  component: StatusTable,
  argTypes: {
    statusList: {
      description: 'API에 대한 정보와 상태를 포함한 리스트를 넣어줍니다.',
    },
  },
};

export const Example = {
  args: {},
};
