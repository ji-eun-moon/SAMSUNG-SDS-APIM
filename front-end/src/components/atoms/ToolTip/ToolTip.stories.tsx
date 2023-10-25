import ToolTip from '.';

export default {
  title: 'stories/ToolTip',
  tags: ['autodocs'],
  component: ToolTip,
  argTypes: {
    explain: {
      description: 'ToolTip 설명에 들어갈 내용',
    },
  },
};

export const ArrowToolTip = {
  args: {
    explain: '밑에 화살표 있는 모양',
  },
};
