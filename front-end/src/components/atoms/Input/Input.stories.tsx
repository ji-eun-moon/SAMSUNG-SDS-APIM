import Input from '.';

export default {
  title: 'atoms/Input',
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
    inputWord: {
      description: '인풋창 입력값을 받아옵니다.',
    },
    placeholder: {
      description: '인풋창 placeholder를 지정합니다.',
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
    placeholder: '비밀번호를 입력해주세요',
  },
};
