import ApplySideBar from '.';

export default {
  title: 'organisms/ApplySideBar',
  tags: ['autodocs'],
  component: ApplySideBar,
  argTypes: {
    isUser: {
      description: '사용자/관리자 구분 - 사용자이면 true',
    },
  },
};

export const UserApply = {
  args: {
    isUser: true,
  },
};

export const AdminApply = {
  args: {
    isUser: false,
  },
};
