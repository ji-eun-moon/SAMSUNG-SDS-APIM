import TextArea from '.';

export default {
  title: 'atoms/TextArea',
  tags: ['autodocs'],
  component: TextArea,
  argTypes: {
    width: {
      description: 'textAreaWord 창 길이를 지정합니다',
    },
    backgroundColor: {
      description: 'textAreaWord 창 배경색을 지정합니다.',
    },
    textAreaWord: {
      description: 'textAreaWord 창 입력값을 받아옵니다.',
    },
    placeholder: {
      description: 'textAreaWord 창 placeholder를 지정합니다.',
    },
  },
};

export const DefaultTextArea = {
  args: {
    width: 'w-64',
    backgroundColor: 'bg-white',
  },
};
