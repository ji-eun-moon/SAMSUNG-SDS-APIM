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
    <div className="mt-8">
      <ShadowCard type="big">
        <div className="flex flex-col px-8 py-4 w-full">
          <Tabs aria-label="Options">
            <Tab key="info" title="개인정보 확인">
              <div className="flex justify-center items-center" style={{ minHeight: '60vh' }}>
                <div className="w-full h-full pt-8 flex justify-center">
                  <UserInfo userInfo={userInfo} />
                </div>
              </div>
            </Tab>
            <Tab key="password" title="비밀번호 변경">
              <div className="flex justify-center items-center" style={{ minHeight: '60vh' }}>
                <div className="w-3/5 h-full flex justify-center">
                  <ChangePassword />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </ShadowCard>
    </div>
  );
}

export default MyPageBox;
