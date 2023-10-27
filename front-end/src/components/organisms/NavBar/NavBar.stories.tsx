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
    noticeCnt: {
      description: 'notice의 현재 알림 개수 데이터를 넣습니다.',
    },
    dropDownList: {
      description: 'TopNavBar 햄버거 버튼 드롭다운에 들어갈 내용을 넣습니다.',
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
      teams: [
        { teamName: 'project 1' },
        { teamName: 'project 2' },
        { teamName: 'project 3' },
        { teamName: 'project 4' },
      ],
      authority: '일반',
    },
    noticeCnt: '6',
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
      teams: [
        { teamName: 'project 1' },
        { teamName: 'project 2' },
        { teamName: 'project 3' },
        { teamName: 'project 4' },
      ],
      authority: '일반',
    },
    noticeCnt: '6',
    notices: <div>쪽지 테스트</div>,
    dropDownList: [
      { title: '메인', icon: 'home', onClick: () => {} },
      { title: '통계', icon: 'home', onClick: () => {} },
      { title: '모니터링', icon: 'home', onClick: () => {} },
    ],
  },
};
