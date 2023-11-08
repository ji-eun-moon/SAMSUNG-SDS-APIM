import { useQuery } from 'react-query';
import { TTeamTokenList } from '@/types/User';
import { getTeamToken } from '@/utils/axios/user';
import Copy from '@/components/atoms/Copy';
import styles from './TeamToken.module.scss';

interface Props {
  team: string;
}

function TeamToken({ team }: Props) {
  const { data: teamToken } = useQuery<TTeamTokenList>(['teamToken', team], async () => {
    const result = await getTeamToken(team);
    return result;
  });

  const headers = ['', '서버명', '토큰', ''];

  if (teamToken === undefined) {
    return null;
  }

  return (
    <div>
      <table className="w-full">
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
          {teamToken && teamToken?.length > 0 ? (
            teamToken.map((token, index) => (
              <tr key={token.categoryId} className="text-sm">
                <td className={`${styles.tr} text-center`}>{index + 1}</td>
                <td className={`${styles.tr} text-center`}>{token.categoryName}</td>
                <td className={`${styles.tr} text-center`}>{token.token}</td>
                <td className={`${styles.tr} text-center`}>
                  <Copy copyText={token.token} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center" style={{ height: '60px' }}>
                토큰이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeamToken;
