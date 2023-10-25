import Button from '.';

export default {
  title: 'stories/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    label: {
      description: '버튼 라벨',
    },
    variant: {
      description: '버튼 타입',
    },
    radius: {
      description: '버튼 둥근 정도',
    },
    onClick: {
      description: '버튼 클릭시 동작할 함수',
    },
  },
};

export const RoundedButton = {
  args: {
    label: 'rounded',
    radius: 'full',
    variant: 'solid',
  },
};

export const OutlinedButton = {
  args: {
    label: 'outlined',
    radius: 'full',
    variant: 'bordered',
  },
};

export const StraightButton = {
  args: {
    label: 'straight',
    variant: 'solid',
  },
};
