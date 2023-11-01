import React, { useEffect, useState } from 'react';
import styles from './MemberTable.module.scss';

interface MemberTableProps {
  headerContent: string[];
  bodyContent: string[][];
  height?: string;
}

function MemberTable({ headerContent, bodyContent, height }: MemberTableProps) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [bodys, setBodys] = useState<string[][]>([]);

  const heightStyle = { height };

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
    <div className={styles.tableWrapper} style={heightStyle}>
      <table className="w-full">
        <thead className={`${styles.header} w-full`}>
          <tr>
            {headers &&
              headers.map((header) => (
                <th key={header} className={styles.th}>
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="bg-white w-full">
          {bodys &&
            bodys.map((body) => (
              <tr key={body[0]}>
                {body.map((cell, index) => (
                  <td
                    key={cell}
                    className={`${styles.tr} text-sm`}
                    style={index === 6 ? { maxWidth: '150px', wordWrap: 'break-word' } : {}}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

MemberTable.defaultProps = {
  height: '100%',
};

export default MemberTable;
