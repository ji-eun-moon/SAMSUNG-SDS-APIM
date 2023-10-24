import Input from '.';

export default {
  title: 'stories/Input',
  tags: ['autodocs'],
  component: Input,
  argTypes: {
    width: {
      description: '인풋창 길이를 지정합니다',
    },
    backgroundColor: {
      description: '인풋창 배경색을 지정합니다.',
    },
  },
};

export const DefaultInput = {
  args: {
    width: 'w-64',
    backgroundColor: 'bg-white',
  },
};
