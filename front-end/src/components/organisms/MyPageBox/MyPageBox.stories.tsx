import MyPageBox from '.';

export default {
  title: 'organisms/MyPageBox',
  tags: ['autodocs'],
  component: MyPageBox,
  argTypes: {
    userInfo: {
      description: 'UserInfo 컴포넌트에 사용될 사용자의 개인정보를 넣어줍니다.',
    },
  },
};

export const MyPageBoxEx = {
  args: {
    userInfo: {
      name: '송사원',
      imageUrl: '/images/profileImg.png',
      email: 'abc@naver.com',
      employeeId: '0912280',
      department: 'IT 개발',
      position: '1팀',
      teams: [
        {
          teamName: 'project 1',
          teamId: 1,
          teamCount: 1,
          teamMembers: [
            {
              name: '양시온',
              imageUrl: '/images/user1.png',
              email: 'user1@example.com',
              employeeId: '1001',
              department: 'IT 개발',
              position: '팀원',
            },
            {
              name: '문지은',
              imageUrl: '/images/user2.png',
              email: 'user2@example.com',
              employeeId: '1002',
              department: 'IT 개발',
              position: '팀원',
            },
          ],
        },
      ],
      authority: '일반',
    },
  },
};
