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
      <div className="flex ml-10 gap-5 justify-center">
        <div className="flex flex-col w-full gap-3 justify-center">
          <div className="flex flex-col justify-center">
            <ProfileImg src={userInfo?.imageUrl} width={140} height={140} />
          </div>
          <div className="grid grid-cols-1 gap-3 w-4/5">
            <div className="flex items-center">
              <div className="w-1/12 itdaSecondary mr-4">이름</div>
              <div className="itdaText">{userInfo?.name}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/12 itdaSecondary mr-4">부서</div>
              <div className="flex itdaText">
                <div>{userInfo?.department}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/12 itdaSecondary mr-4">사번</div>
              <div className="itdaText">{userInfo?.employeeId}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/12 itdaSecondary mr-4">직무</div>
              <div className="flex itdaText">
                <div>{userInfo?.position}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/12 itdaSecondary mr-4">이메일</div>
              <div className="itdaText">{userInfo?.email}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/12 itdaSecondary mr-3">소속팀</div>
              <div className="itdaText flex items-center w-4/5">
                <TeamSelect list={teamList} />
                {/* {teamList.map((team) => (
                  <div>{team}</div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
