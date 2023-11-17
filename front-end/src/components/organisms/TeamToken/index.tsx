import { useQuery } from 'react-query';
import { TTeamTokenList } from '@/types/User';
import { getTeamToken } from '@/utils/axios/user';
import Link from 'next/link';
import Copy from '@/components/atoms/Copy';
import styles from './TeamToken.module.scss';

interface Props {
  team: string;
  searchWord: string;
}

function TeamToken({ team, searchWord }: Props) {
  const { data: teamToken } = useQuery<TTeamTokenList>(['teamToken', team], async () => {
    const result = await getTeamToken(team);
    return result;
  });

  const headers = ['', '서버명', '토큰', ''];

  const filteredTeamToken = teamToken?.filter((token) =>
    token.categoryName.toLowerCase().includes(searchWord.toLowerCase()),
  );

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
          {filteredTeamToken && filteredTeamToken.length > 0 ? (
            filteredTeamToken.map((token, index) => (
              <tr key={token.categoryId} className="text-sm">
                <td className={`${styles.tr} text-center`}>{index + 1}</td>
                <td className={`${styles.tr} text-center hover:font-semibold cursor-pointer`}>
                  <Link href={`/category/${token.categoryId}`}>{token.categoryName}</Link>
                </td>
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
