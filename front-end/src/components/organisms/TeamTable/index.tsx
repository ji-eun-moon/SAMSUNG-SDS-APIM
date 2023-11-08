import { useState } from 'react';
import { ITeamInfo } from '@/types/User';
import DropDown from '@/components/atoms/DropDown';
import { useQuery } from 'react-query';
import StyledPagination from '@/components/atoms/StyledPagination';
import { getTeamInfo } from '@/utils/axios/user';
import styles from './TeamTable.module.scss';

interface Props {
  team: string;
}

function MemberTable({ team }: Props) {
  const [clickPage, setClickPage] = useState(1);
  const { data: teamInfo } = useQuery<ITeamInfo>(['teamInfo', clickPage, team], async () => {
    const result = await getTeamInfo({ page: clickPage - 1, size: 7, teamName: team });
    return result;
  });
  const handlePageClick = (clickedPage: number) => {
    setClickPage(clickedPage);
  };

  const headers = ['사번', '성명', '부서', '직무', '이메일'];

  if (teamInfo === undefined) {
    return null;
  }

  const memberList = teamInfo.teamMembers.content;

  return (
    <div>
      <table className="w-full">
        <colgroup>
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '35%' }} />
        </colgroup>
        <thead className={`w-full ${styles.header}`}>
          <tr>
            {headers?.map((header) => (
              <th key={header} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white w-full">
          {memberList && memberList?.length > 0 ? (
            memberList.map((member) => (
              <tr key={member.employeeId} className="text-sm">
                <td className={`${styles.tr} text-center`}>{member.employeeId}</td>
                <td className={`${styles.tr} text-center`}>
                  <DropDown
                    trigger={<button type="button">{member.name}</button>}
                    list={[{ title: '쪽지 보내기', icon: 'message', url: '' }]}
                  />
                </td>
                <td className={`${styles.tr} text-center`}>{member.department}</td>
                <td className={`${styles.tr} text-center`}>{member.position}</td>
                <td className={`${styles.tr}`}>{member.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center" style={{ height: '60px' }}>
                사원이 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <StyledPagination
          totalPage={teamInfo?.teamMembers.totalPages}
          clickPage={clickPage}
          onClickPage={handlePageClick}
        />
      </div>
    </div>
  );
}

export default MemberTable;
