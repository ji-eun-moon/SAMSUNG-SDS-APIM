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
    isPassword: {
      description: '비밀번호 인풋창인지 설정합니다.',
    },
  },
};

export const DefaultInput = {
  args: {
    width: 'w-64',
    backgroundColor: 'bg-white',
  },
};

export const PasswordInput = {
  args: {
    width: 'w-64',
    isPassword: true,
  },
};
