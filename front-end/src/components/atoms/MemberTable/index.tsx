import React, { useEffect, useState } from 'react';
import styles from './MemberTable.module.scss';

interface MemberTableProps {
  headerContent: string[];
  bodyContent: string[][];
}

function MemberTable({ headerContent, bodyContent }: MemberTableProps) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [bodys, setBodys] = useState<string[][]>([]);

  useEffect(() => {
    if (headerContent && headerContent.length) {
      setHeaders(headerContent);
    }
    if (bodyContent && bodyContent.length) {
      const filteredBodys = bodyContent.filter((content) => content.length === headerContent.length);
      setBodys(filteredBodys);
    }
  }, [headerContent, bodyContent]);

  return (
    <table className="w-full">
      <thead className={styles.header}>
        <tr>
          {headers &&
            headers.map((header) => (
              <th key={header} className={styles.th}>
                {header}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {bodys &&
          bodys.map((body) => (
            <tr key={body[0]}>
              {body.map((cell) => (
                <td key={cell} className={styles.tr}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default MemberTable;
