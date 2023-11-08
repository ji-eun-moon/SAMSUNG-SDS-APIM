import React from 'react';
import SelectBox from '@/components/atoms/SelectBox';
import ShadowCard from '@/components/atoms/ShadowCard';
import { TTeamList, ITeamInfo } from '@/types/User';
import TeamTable from '@/components/organisms/TeamTable';

interface TeamInfoBoxProps {
  teamList: TTeamList;
  teamData: ITeamInfo | null;
  currentTeam: string;
  setTeam: (teamName: string) => void;
}

function TeamInfoBox({ teamList, teamData, currentTeam, setTeam }: TeamInfoBoxProps) {
  const list = teamList?.map((team) => team.teamName);

  return (
    <div className="mt-8 ml-8">
      <ShadowCard type="big">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-baseline">
              <div className="itdaText text-lg mr-3">팀 정보 조회</div>
              <div className="itdaSecondary text-sm">팀 선택시 팀 토큰과 멤버 조회가 가능합니다</div>
            </div>
            <div className="w-3/12">
              <SelectBox list={list} defaultSelect={currentTeam} onChange={(teamName) => setTeam(teamName)} />
            </div>
          </div>
          <TeamTable memberList={teamData?.teamMembers} />
        </div>
      </ShadowCard>
    </div>
  );
}

export default TeamInfoBox;
