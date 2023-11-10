import React from 'react';
import UserShortCuts from '@/components/atoms/UserShortCuts';
import MainApiStatus from '@/components/organisms/MainApiStatus';
import MainNotice from '../MainNoticeList';

function UserMainBox() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-3">
        <UserShortCuts />
        <MainNotice />
      </div>
      <MainApiStatus />
    </div>
  );
}

export default UserMainBox;
