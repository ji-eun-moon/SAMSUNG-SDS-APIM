import React, { useEffect, useState } from 'react';
import style from './RowTable.module.scss';

interface Info {
  처리상태: string;
  처리내용: string;
}

interface RowTableProps {
  title: string;
  headerContent: [];
  bodyContent: Info[];
}

/**
 * RowTable 컴포넌트
 * @param {string} title - RowTable 제목
 * @param {[]} headerContent - RowTable 왼쪽 값(header)
 * @param {[]} bodyContent - RowTable 오른쪽 값(body)
 */

function RowTable({ title, headerContent, bodyContent }: RowTableProps) {
  const [headers, setHeaders] = useState<Array<{ text: string; value: string }>>([]);
  const [bodys, setBodys] = useState<Info[]>([]);

  useEffect(() => {
    if (headerContent && headerContent.length) {
      const newHeaders = headerContent.map((content) => ({ text: content, value: content }));
      setHeaders(newHeaders);
      console.log('headers', newHeaders);
    }
    if (bodyContent && bodyContent.length) {
      const newBodys = bodyContent;
      setBodys(newBodys);
    }
  }, [headerContent, bodyContent]);

  return (
    <div>
      <span className={`${style.title}`}>{title}</span>
      <div className={`${style.table}`}>
        {bodys &&
          bodys.map((body) => (
            <div key={JSON.stringify(body)}>
              {headers &&
                headers.map((header, index) => (
                  <div className={`${style.row}`} key={header.text}>
                    <div className={`${style.left}`} style={index === 0 ? { borderTop: '1px solid #9a9a9a' } : {}}>
                      <span>{header.text}</span>
                    </div>
                    <div className={`${style.right}`} style={index === 0 ? { borderTop: '1px solid #9a9a9a' } : {}}>
                      <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {body[header.text as keyof Info]}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default RowTable;
