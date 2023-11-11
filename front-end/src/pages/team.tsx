import React, { useState } from 'react';
import { IUser } from '@/types/User';
import { NextPage, GetStaticProps } from 'next';
import { useQuery, QueryClient } from 'react-query';
import { getUserInfo, getTeamInfo, getTeamToken } from '@/utils/axios/user';
import useUserStore, { getSelectedTeam } from '@/store/useUserStore';
// import SideLayout from '@/components/templates/SideLayout';
import TopLayout from '@/components/templates/TopLayout';
// import GoBack from '@/components/atoms/GoBack';
import TeamInfoBox from '@/components/organisms/TeamInfoBox';
import { dehydrate } from 'react-query/hydration';

const Team: NextPage = () => {
  const { selectedTeam } = useUserStore();
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const defaultTeamName = userInfo?.teams[0]?.teamName;
  const initialTeam = selectedTeam !== null ? selectedTeam : defaultTeamName;
  const [team, setTeam] = useState<string>(initialTeam || '');

  if (userInfo === undefined) {
    return null;
  }

  return (
    <TopLayout>
      <div style={{ margin: '30px 200px' }}>
        {/* <GoBack label="팀 정보" /> */}
        <TeamInfoBox teamList={userInfo.teams} setTeam={(teamName) => setTeam(teamName)} currentTeam={team} />
      </div>
    </TopLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const selectedTeam = getSelectedTeam();
  await queryClient.prefetchQuery(['teamInfo', 0, selectedTeam], () =>
    getTeamInfo({ teamName: selectedTeam, page: 0, size: 7 }),
  );
  await queryClient.prefetchQuery(['teamToken', selectedTeam], () => getTeamToken(selectedTeam));
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Team;
