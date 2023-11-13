import { IUser } from '@/types/User';
// import ShadowCard from '@/components/atoms/ShadowCard';
import GoBack from '@/components/atoms/GoBack';
import UserInfo from '@/components/organisms/UserInfo';
import ChangePassword from '@/components/organisms/ChangePasswordBox';
import ToolTip from '@/components/atoms/ToolTip';

interface MyPageBoxProps {
  userInfo: IUser;
  type: string;
}

function MyPageBox({ type, userInfo }: MyPageBoxProps) {
  if (type === 'info') {
    return (
      <div className="px-4 py-3">
        <GoBack label="개인정보확인" />
        {/* <ShadowCard type="noShadow"> */}
        <div className="flex ml-4 mt-8 justify-center items-center" style={{ fontSize: '0.9rem' }}>
          <div className="w-full h-full">
            <UserInfo userInfo={userInfo} />
          </div>
        </div>
        {/* </ShadowCard> */}
      </div>
    );
  }

  if (type === 'password') {
    return (
      <div className="px-4 py-3">
        <div className="flex gap-3">
          <GoBack label="비밀번호변경" />
          <ToolTip>
            <div className="itdaSecondary" style={{ fontSize: '0.9rem' }}>
              아직 처음 계정 생성시 발급받은 임시비밀번호를 사용중이시라면 비밀번호를 꼭 변경하세요
            </div>
          </ToolTip>
        </div>
        <div className="flex ml-4 mt-8" style={{ minHeight: '60vh' }}>
          <div className="w-3/5 ">
            {/* <ShadowCard type="noShadow"> */}
            <ChangePassword />
            {/* </ShadowCard> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPageBox;
