import React from 'react';
import UserShortCuts from '@/components/atoms/UserShortCuts';
import MainApiStatus from '@/components/organisms/MainApiStatus';
import MainNotice from '../MainNoticeList';
import MainUseStatistics from '../MainUseStatistics';
import MainProvideStatistics from '../MainProvideStatistics';
// import styles from './UserMainBox.module.scss';

function UserMainBox() {
  return (
    <div className="w-full flex flex-col gap-4">
      <UserShortCuts />
      <div className="flex gap-4">
        <MainNotice />
        <MainApiStatus />
      </div>
      <div className="flex w-full gap-4">
        <MainUseStatistics />
        <MainProvideStatistics />
      </div>
    </div>
  );
}

export default UserMainBox;
