import React from 'react';
import { IUser } from '@/types/User';
import ProfileImg from '@/components/atoms/ProfileImg';
import ShadowCard from '@/components/atoms/ShadowCard';

interface UserInfoProps {
  userInfo: IUser;
}

function UserInfo({ userInfo }: UserInfoProps) {
  const teamList = userInfo?.teams?.map((team) => team.teamName);

  return (
    <div className="w-4/5">
      <div className="flex ml-10 gap-5 justify-center">
        <div className="flex flex-col w-full gap-3 justify-center">
          <div className="flex flex-col mb-5 items-center">
            <ProfileImg src={userInfo?.imageUrl} width={140} height={140} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-2/12 itdaSecondary mr-4">이름</div>
              <ShadowCard type="noShadow">
                <div className="itdaText">{userInfo?.name}</div>
              </ShadowCard>
            </div>
            <div className="flex items-center">
              <div className="w-2/12 itdaSecondary mr-4">부서</div>
              <ShadowCard type="noShadow">
                <div className="itdaText">
                  <div>{userInfo?.department}</div>
                </div>
              </ShadowCard>
            </div>
            <div className="flex items-center">
              <div className="w-2/12 itdaSecondary mr-4">사번</div>
              <ShadowCard type="noShadow">
                <div className="itdaText">
                  <div>{userInfo?.employeeId}</div>
                </div>
              </ShadowCard>
            </div>
            <div className="flex items-center">
              <div className="w-2/12 itdaSecondary mr-4">직무</div>
              <ShadowCard type="noShadow">
                <div className="itdaText">
                  <div>{userInfo?.position}</div>
                </div>
              </ShadowCard>
            </div>
            <div className="flex items-center">
              <div className="w-2/12 itdaSecondary mr-4">이메일</div>
              <ShadowCard type="noShadow">
                <div className="itdaText">{userInfo?.email}</div>
              </ShadowCard>
            </div>
            <div className="flex items-center">
              <div className="w-2/12 itdaSecondary mr-4">소속팀</div>
              <ShadowCard type="noShadow">
                <div className="itdaText">{teamList?.join(', ')}</div>
              </ShadowCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
