import React, { useState } from 'react';
import { IUser } from '@/types/User';
import { NextPage, GetStaticProps } from 'next';
import { useQuery, QueryClient } from 'react-query';
import { getUserInfo, getTeamInfo, getTeamToken } from '@/utils/axios/user';
import useUserStore, { getSelectedTeam } from '@/store/useUserStore';
import BothLayout from '@/components/templates/BothLayout';
import MyPageSideBar from '@/components/organisms/MyPageSideBar';
import TeamInfoBox from '@/components/organisms/TeamInfoBox';
import { dehydrate } from 'react-query/hydration';

const TeamMember: NextPage = () => {
  const { selectedTeam } = useUserStore();
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const defaultTeamName = userInfo?.teams[0]?.teamName;
  const initialTeam = selectedTeam !== null ? selectedTeam : defaultTeamName;
  const [team, setTeam] = useState<string>(initialTeam || '');

  if (userInfo === undefined) {
    return null;
  }

  return (
    <BothLayout>
      <MyPageSideBar />
      <TeamInfoBox
        type="member"
        teamList={userInfo.teams}
        setTeam={(teamName) => setTeam(teamName)}
        currentTeam={team}
      />
    </BothLayout>
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

export default TeamMember;
