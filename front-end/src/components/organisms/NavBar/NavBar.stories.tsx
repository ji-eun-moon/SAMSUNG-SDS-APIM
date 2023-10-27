import NavBar from '.';

export default {
  title: 'organisms/NavBar',
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
    teamList: {
      description: 'selectbox에 들어갈 데이터리스트를 넣습니다.',
    },
    noticeCnt: {
      description: 'notice의 현재 알림 개수 데이터를 넣습니다.',
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
    noticeCnt: '6',
  },
};
