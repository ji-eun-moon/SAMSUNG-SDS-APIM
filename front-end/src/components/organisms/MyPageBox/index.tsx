import { IUser } from '@/types/User';
import ShadowCard from '@/components/atoms/ShadowCard';
import UserInfo from '@/components/organisms/UserInfo';
import ChangePassword from '@/components/organisms/ChangePassword';

interface MyPageBoxProps {
  userInfo: IUser;
}

function MyPageBox({ userInfo }: MyPageBoxProps) {
  return (
    <div className="mt-8 ml-8">
      <ShadowCard type="big">
        <div className="flex flex-col px-8 py-4 gap-3">
          <UserInfo userInfo={userInfo} />
          <ChangePassword />
        </div>
      </ShadowCard>
    </div>
  );
}

export default MyPageBox;
