import React, { useState, useEffect } from 'react';
import { IUser, ITeamInfo } from '@/types/User';
import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { getUserInfo, getTeamInfo } from '@/utils/axios/user';
import useUserStore from '@/store/useUserStore';
import SideLayout from '@/components/templates/SideLayout';
import GoBack from '@/components/atoms/GoBack';
import TeamInfoBox from '@/components/organisms/TeamInfoBox';

const Team: NextPage = () => {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { selectedTeam } = useUserStore();
  const defaultTeamName = userInfo?.teams[0]?.teamName;
  const initialTeam = selectedTeam !== null ? selectedTeam : defaultTeamName;
  const [team, setTeam] = useState<string>(initialTeam || '');
  const [teamData, setTeamData] = useState<ITeamInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (team) {
        const result = await getTeamInfo(team);
        await setTeamData(result);
      }
    };

    fetchData();
  }, [team]);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <SideLayout>
      <div>
        <GoBack label="팀 정보" />
        <TeamInfoBox
          teamList={userInfo.teams}
          teamData={teamData}
          setTeam={(teamName) => setTeam(teamName)}
          currentTeam={team}
        />
      </div>
    </SideLayout>
  );
};

export default Team;
