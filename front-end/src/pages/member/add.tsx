import SideLayout from '@/components/templates/SideLayout';
import NavBar from '@/components/organisms/NavBar';
import GoBack from '@/components/atoms/GoBack';
import AddMemberBox from '@/components/organisms/AddMemberBox';

const userInfo = {
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
};

export default function MemberAdd() {
  return (
    <SideLayout>
      <NavBar position="side" userInfo={userInfo} noticeCnt="5" />
      <div>
        <GoBack label="사원생성" />
        <AddMemberBox />
      </div>
    </SideLayout>
  );
}
