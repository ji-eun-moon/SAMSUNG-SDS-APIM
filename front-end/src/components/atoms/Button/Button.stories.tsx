import Button from '.';

export default {
  title: 'stories/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    label: {
      description: '버튼 라벨',
    },
    backgroundColor: {
      description: '버튼 배경색',
    },
    type: {
      description: '버튼 타입',
    },
    borderColor: {
      description: 'outline 버튼 border 색상',
    },
    textColor: {
      description: 'outline 버튼 Text 색상',
    },
    onButton: {
      description: '버튼 클릭시 동작할 함수',
    },
  },
};

export const RoundedButton = {
  args: {
    label: 'rounded',
    type: 'rounded',
    backgroundColor: 'bg-blue-500',
    borderColor: 'border-blue-500',
  },
};

export const OutlinedButton = {
  args: {
    label: 'outlined',
    type: 'outlined',
    borderColor: 'border-blue-500',
  },
};

export const StraightButton = {
  args: {
    label: 'straight',
    type: 'straight',
    backgroundColor: 'bg-blue-500',
    borderColor: 'border-blue-500',
  },
};
