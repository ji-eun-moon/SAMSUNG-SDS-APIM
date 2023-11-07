import React from 'react';
import { IApiStatus } from '@/types/Api';
import { useRouter } from 'next/router';
import Status from '@/components/atoms/Status';
import StatusTable from '@/components/organisms/StatusTable';
import SearchBar from '@/components/atoms/SearchBar';

interface StatusBoxProps {
  statusList: IApiStatus[];
  searchWord: string;
  changeSearchWord: (searchWord: string) => void;
}

function StatusBox({ statusList, searchWord, changeSearchWord }: StatusBoxProps) {
  const router = useRouter();

  // API 검색
  const onSearchHandler = () => {
    // 현재 URL 정보 가져오기
    const currentQuery = router.query;

    // 검색어를 쿼리에 추가
    currentQuery.query = searchWord;

    // 새 경로 생성
    const newPath = {
      pathname: router.pathname, // 현재 경로 유지
      query: currentQuery, // 쿼리 업데이트
    };

    // 새 경로로 이동
    router.push(newPath);
  };

  // 검색 필터 초기화 함수
  const clearSearchFilter = () => {
    changeSearchWord(''); // 검색어 초기화
    router.push({ pathname: router.pathname, query: {} }); // 쿼리 파라미터 초기화
  };

  return (
    <div className="ml-8 mt-7 itdaText">
      <div className="w-full mb-3 flex justify-between items-center">
        <div className="flex gap-2">
          <SearchBar
            keyword={searchWord}
            onChange={changeSearchWord}
            onSearchHandler={onSearchHandler}
            placeholder="API 검색"
          />
          {searchWord && (
            <div
              onClick={clearSearchFilter}
              aria-hidden
              className="flex items-center text-sm cursor-pointer itdaSecondary"
            >
              검색 필터 초기화
            </div>
          )}
        </div>
        <div className="flex gap-5">
          <button type="button" className="flex items-center" onClick={() => router.push('/apis/status?filter=정상')}>
            <Status status="정상" />
            &nbsp;&nbsp;정상작동
          </button>
          <button type="button" className="flex items-center" onClick={() => router.push('/apis/status?filter=점검')}>
            <Status status="점검" />
            &nbsp;&nbsp;점검중
          </button>
          <button type="button" className="flex items-center" onClick={() => router.push('/apis/status?filter=오류')}>
            <Status status="오류" />
            &nbsp;&nbsp;오류발생
          </button>
        </div>
      </div>
      <StatusTable statusList={statusList} />
    </div>
  );
}

export default StatusBox;
