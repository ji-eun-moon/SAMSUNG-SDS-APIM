import React from 'react';
import { IUser } from '@/types/User';
import ProfileImg from '@/components/atoms/ProfileImg';
import TeamSelect from '@/components/organisms/TeamSelect';

interface UserInfoProps {
  userInfo: IUser;
}

function UserInfo({ userInfo }: UserInfoProps) {
  const teamList = userInfo?.teams?.map((team) => team.teamName);

  return (
    <div className="w-full">
      <div className="flex items-center mb-7">
        {/* <Icon /> */}
        <div className="ml-2 text-lg itdaText text-semibold">개인정보 확인</div>
      </div>
      <div className="flex ml-10 gap-5">
        <div className="flex flex-col w-1/6 items-center mr-10">
          <ProfileImg src={userInfo?.imageUrl} width={170} height={170} />
        </div>

        <div className="flex flex-col w-full gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <div className="w-1/6 itdaSecondary mr-4">이름</div>
              <div className="itdaText">{userInfo?.name}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/6 itdaSecondary mr-4">부서</div>
              <div className="flex itdaText">
                <div>{userInfo?.department}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/6 itdaSecondary mr-4">사번</div>
              <div className="itdaText">{userInfo?.employeeId}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/6 itdaSecondary mr-4">직무</div>
              <div className="flex itdaText">
                <div>{userInfo?.position}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/6 itdaSecondary mr-4">이메일</div>
              <div className="itdaText">{userInfo?.email}</div>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/12 flex items-center itdaSecondary mr-4">소속팀</div>
            <div className="itdaText flex items-center w-full">
              <TeamSelect list={teamList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
