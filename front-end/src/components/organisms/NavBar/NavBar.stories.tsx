import NavBar from '.';

export default {
  title: 'stories/NavBar',
  tags: ['autodocs'],
  component: NavBar,
  argTypes: {
    position: {
      description: 'navbar 위치를 입력합니다.',
    },
    userInfo: {
      description: '사용자 정보 데이터를 넣습니다.',
      control: {
        type: 'object',
      },
    },
  },
};

export const SideNavBar = {
  args: {
    position: 'side',
    userInfo: {
      name: '김사원',
      imageUrl: '/images/profileImg.png',
      employeeId: '0912280',
      department: 'IT 개발',
      position: '1팀',
      team: ['project 1', 'project 2', 'project 3', 'project 4'],
      authority: '일반',
    },
  },
};

export const TopNavBar = {
  args: {
    position: 'top',
    userInfo: {
      name: '김사원',
      imageUrl: '/images/profileImg.png',
      employeeId: '0912280',
      department: 'IT 개발',
      position: '1팀',
      team: ['project 1', 'project 2', 'project 3', 'project 4'],
      authority: '일반',
    },
  },
};
