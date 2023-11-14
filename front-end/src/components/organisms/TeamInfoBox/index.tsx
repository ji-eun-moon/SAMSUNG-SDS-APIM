import React, { useState } from 'react';
import { TTeamList } from '@/types/User';
import SearchBar from '@/components/atoms/SearchBar';
import TeamTable from '@/components/organisms/TeamTable';
import TeamToken from '@/components/organisms/TeamToken';
import CustomSelect from '@/components/atoms/CustomSelect';
import GoBack from '@/components/atoms/GoBack';

interface TeamInfoBoxProps {
  type: string;
  teamList: TTeamList;
  currentTeam: string;
  setTeam: (teamName: string) => void;
}

function TeamInfoBox({ type, teamList, currentTeam, setTeam }: TeamInfoBoxProps) {
  const list = teamList?.map((team) => team.teamName);
  const [searchWord, setSearchWord] = useState('');

  if (type === 'token') {
    return (
      <div className="px-4 py-3">
        <GoBack label="팀토큰 확인" />
        <div className="itdaSecondary ml-9 my-2" style={{ fontSize: '0.9rem' }}>
          팀별로 신청한 카테고리에 대한 토큰 정보를 확인하실 수 있습니다
        </div>
        <div className="ml-8 flex justify-between mb-4 items-center">
          <div className="flex gap-2 items-center w-full">
            <div className="w-52">
              <SearchBar
                keyword={searchWord}
                onChange={setSearchWord}
                placeholder="서버명 검색"
                onSearchHandler={() => {}}
              />
            </div>
            {searchWord && (
              <div
                className="flex items-center cursor-pointer text-sm cursor-pointer itdaSecondary"
                onClick={() => setSearchWord('')}
                aria-hidden
              >
                검색 필터 초기화
              </div>
            )}
          </div>
          <div className="w-36">
            <CustomSelect items={list} value={currentTeam} onChange={(teamName) => setTeam(teamName)} height="39px" />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex w-full flex-col ml-8">
            <TeamToken team={currentTeam} searchWord={searchWord} />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'member') {
    return (
      // <ShadowCard type="bordersmall" bgcolor="#ffffff">
      <div className="px-4 py-3">
        <GoBack label="팀원 정보 확인" />
        <div className="flex justify-end mb-4">
          {/* <div className="itdaSecondary ml-9">팀원의 정보를 조회할 수 있습니다</div> */}
          <div className="w-36">
            <CustomSelect items={list} value={currentTeam} onChange={(teamName) => setTeam(teamName)} height="39px" />
            {/* <SelectBox list={list} defaultSelect={currentTeam} onChange={(teamName) => setTeam(teamName)} /> */}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex w-full flex-col ml-8">
            <TeamTable team={currentTeam} />
          </div>
        </div>
      </div>
      // {/* </ShadowCard> */}
    );
  }
}

export default TeamInfoBox;
