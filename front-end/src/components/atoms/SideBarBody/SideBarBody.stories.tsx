import SideBarBody from '.';

export default {
  title: 'atoms/SideBarBody',
  tags: ['autodocs'],
  component: SideBarBody,
  argTypes: {
    children: {
      description: 'SideBar 내부에 들어갈 부분',
      type: {
        summary: 'React.ReactNode',
      },
    },
  },
};

export const Example = {
  args: {
    children: '',
  },
};
