import ChartFrame from '.';

export default {
  title: 'atoms/ChartFrame',
  tags: ['autodocs'],
  component: ChartFrame,
  argTypes: {
    children: {
      description: '슬라이더 아이템 요소',
    },
    title: {
      description: '차트 프레임 타이틀',
    },
  },
};

export const OnClickFalse = {
  args: {},
};
