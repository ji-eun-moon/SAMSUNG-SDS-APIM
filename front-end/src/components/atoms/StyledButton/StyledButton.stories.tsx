import StyledButton from '.';

export default {
  title: 'atoms/StyledButton',
  tags: ['autodocs'],
  component: StyledButton,
  argTypes: {
    label: {
      description: '버튼 라벨',
    },
    variant: {
      description: '버튼 모양',
    },
    radius: {
      description: '버튼 둥근 정도',
    },
    onClick: {
      description: '버튼 클릭시 동작할 함수',
    },
    type: {
      description: '버튼 타입',
    },
  },
};

export const RoundedButton = {
  args: {
    label: 'rounded',
    radius: 'full',
    variant: 'solid',
    type: 'button',
  },
};

export const OutlinedButton = {
  args: {
    label: 'outlined',
    radius: 'full',
    variant: 'bordered',
    type: 'button',
  },
};

export const StraightButton = {
  args: {
    label: 'straight',
    variant: 'solid',
    type: 'button',
  },
};
