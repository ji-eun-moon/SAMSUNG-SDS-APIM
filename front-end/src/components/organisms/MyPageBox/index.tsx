import { IUser } from '@/types/User';
import ShadowCard from '@/components/atoms/ShadowCard';
import { Tabs, Tab } from '@nextui-org/react';
import UserInfo from '@/components/organisms/UserInfo';
import ChangePassword from '@/components/organisms/ChangePasswordBox';

interface MyPageBoxProps {
  userInfo: IUser;
}

function MyPageBox({ userInfo }: MyPageBoxProps) {
  return (
    <div className="mt-8 ml-8">
      <ShadowCard type="big">
        <div className="flex flex-col px-8 py-4 gap-3 w-full">
          <Tabs aria-label="Options">
            <Tab key="photos" title="개인정보 확인">
              <UserInfo userInfo={userInfo} />
            </Tab>
            <Tab key="photos" title="비밀번호 변경">
              <ChangePassword />
            </Tab>
          </Tabs>
        </div>
      </ShadowCard>
    </div>
  );
}

export default MyPageBox;
