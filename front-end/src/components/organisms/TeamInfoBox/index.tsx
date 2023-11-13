import React from 'react';
// import SelectBox from '@/components/atoms/SelectBox';
import ShadowCard from '@/components/atoms/ShadowCard';
import { TTeamList } from '@/types/User';
import TeamTable from '@/components/organisms/TeamTable';
import TeamToken from '@/components/organisms/TeamToken';
import { Tabs, Tab } from '@nextui-org/react';
import CustomSelect from '@/components/atoms/CustomSelect';

interface TeamInfoBoxProps {
  teamList: TTeamList;
  currentTeam: string;
  setTeam: (teamName: string) => void;
}

function TeamInfoBox({ teamList, currentTeam, setTeam }: TeamInfoBoxProps) {
  const list = teamList?.map((team) => team.teamName);

  return (
    <ShadowCard type="bordersmall" bgcolor="#ffffff">
      <div className="px-4 py-3 relative">
        {/* 팀 선택 SelectBox */}
        <div className="absolute right-5">
          <div className="w-36">
            <CustomSelect items={list} value={currentTeam} onChange={(teamName) => setTeam(teamName)} height="39px" />
            {/* <SelectBox list={list} defaultSelect={currentTeam} onChange={(teamName) => setTeam(teamName)} /> */}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex w-full flex-col">
            <Tabs>
              <Tab key="token" title="팀 토큰">
                <div>
                  <TeamToken team={currentTeam} />
                </div>
              </Tab>
              <Tab key="info" title="팀 정보">
                <TeamTable team={currentTeam} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </ShadowCard>
  );
}

export default TeamInfoBox;
