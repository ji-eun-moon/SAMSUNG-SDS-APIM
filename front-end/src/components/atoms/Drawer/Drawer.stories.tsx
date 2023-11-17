import Drawer from '.';

export default {
  title: 'atoms/Drawer',
  tags: ['autodocs'],
  component: Drawer,
  argTypes: {
    children: {
      description: 'Drawer 내부에 들어갈 내용',
    },
  },
};

export const Example = {
  args: {
    children: <div>Drawer 입니다.</div>,
  },
};
