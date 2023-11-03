import React from 'react';
import { TUserList } from '@/types/User';
import ShadowCard from '@/components/atoms/ShadowCard';

interface UserListBoxProps {
  userList: TUserList;
}

function UserListBox({ userList }: UserListBoxProps) {
  return (
    <div className="mt-8 ml-8">
      <ShadowCard type="big">
        <div className="flex items-baseline">
          <div className="itdaText text-lg mr-3">사원 정보 조회</div>
          <div className="itdaSecondary text-sm">사원의 정보를 조회하고, 팀을 부여 할 수 있습니다.</div>
        </div>
        {userList.map((user) => (
          <div>{user.memberId}</div>
        ))}
      </ShadowCard>
    </div>
  );
}

export default UserListBox;
