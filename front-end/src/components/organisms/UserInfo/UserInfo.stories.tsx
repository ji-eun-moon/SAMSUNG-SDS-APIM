import UserInfo from '.';

export default {
  title: 'organisms/UserInfo',
  tags: ['autodocs'],
  component: UserInfo,
  argTypes: {
    userInfo: {
      description: '사용자의 개인정보를 넣어줍니다.',
    },
  },
};

export const UserInfoEx = {
  args: {
    userInfo: {
      name: '김사원',
      imageUrl: '/images/profileImg.png',
      employeeId: '0912280',
      department: 'IT 개발',
      position: '1팀',
      email: 'ssafy.itda@gmail.com',
      teams: [
        { teamName: 'project 1' },
        { teamName: 'project 2' },
        { teamName: 'project 3' },
        { teamName: 'project 4' },
      ],
      authority: '일반',
    },
  },
};
