import React, { useState } from 'react';
import UserShortCuts from '@/components/atoms/UserShortCuts';
import MainApiStatus from '@/components/organisms/MainApiStatus';
import SearchBar from '@/components/atoms/SearchBar';
import { useRouter } from 'next/router';
import MainNotice from '../MainNoticeList';
import MainUseStatistics from '../MainUseStatistics';
import MainProvideStatistics from '../MainProvideStatistics';
// import styles from './UserMainBox.module.scss';

function UserMainBox() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex justify-between">
        <UserShortCuts />
        <div className="w-3/12">
          <SearchBar
            keyword={searchWord}
            onChange={setSearchWord}
            onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
            placeholder="API 검색"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <MainNotice />
        <MainApiStatus />
      </div>
      <div className="flex w-full gap-3">
        <MainUseStatistics />
        <MainProvideStatistics />
      </div>
    </div>
  );
}

export default UserMainBox;
