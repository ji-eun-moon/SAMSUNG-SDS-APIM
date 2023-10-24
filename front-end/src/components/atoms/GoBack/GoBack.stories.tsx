import GoBack from '.';

export default {
  title: 'stories/GoBack',
  tags: ['autodocs'],
  component: GoBack,
  argTypes: {
    label: {
      description: '헤더 이름',
    },
  },
};

export const Example = {
  args: {
    label: 'API 목록',
  },
};
