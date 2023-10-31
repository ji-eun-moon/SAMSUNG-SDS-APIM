import ToolTip from '.';

export default {
  title: 'atoms/ToolTip',
  tags: ['autodocs'],
  component: ToolTip,
  argTypes: {
    children: {
      description: 'ToolTip 설명에 들어갈 내용',
    },
  },
};

export const ArrowToolTip = {
  args: {
    children: '밑에 화살표 있는 모양',
  },
};
