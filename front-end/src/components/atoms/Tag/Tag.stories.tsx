import Tag from '.';

export default {
  title: 'atoms/Tag',
  tags: ['autodocs'],
  component: Tag,
  argTypes: {
    type: {
      description: '[new] 신규 border-blue-600 text-blue-600; [change] 변경 border-red-500 text-red-500',
    },
  },
};

export const DefaultTag = {
  args: {
    type: 'new',
  },
};
