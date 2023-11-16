import { IUser } from '@/types/User';
import AddMemberBox from '@/components/organisms/AddMemberBox';
import MemberList from '@/components/organisms/MemberList';

interface MemberPageBoxProps {
  userInfo: IUser;
  type: string;
}

function MemberPageBox({ type, userInfo }: MemberPageBoxProps) {
  if (userInfo) {
    if (type === 'list') {
      return <MemberList />;
    }

    if (type === 'add') {
      return <AddMemberBox />;
    }
  }
}

export default MemberPageBox;
