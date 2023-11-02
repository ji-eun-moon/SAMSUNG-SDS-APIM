import React, { useEffect, useState } from 'react';
import style from './RowTable.module.scss';
import Tag from '../Tag';

interface RowTableProps {
  title: string;
  headerContent: string[];
  bodyContent: (string[] | number[] | Date[] | { [key: string]: string | number | Date })[];
}

/**
 * RowTable 컴포넌트
 * @param {string} title - RowTable 제목
 * @param {[]} headerContent - RowTable 왼쪽 값(header)
 * @param {[]} bodyContent - RowTable 오른쪽 값(body)
 */

function RowTable({ title, headerContent, bodyContent }: RowTableProps) {
  const [headers, setHeaders] = useState<Array<{ text: string; value: string }>>([]);
  const [bodys, setBodys] = useState<
    null | (string[] | number[] | Date[] | { [key: string]: string | number | Date })[]
  >(null);

  useEffect(() => {
    if (Array.isArray(headerContent)) {
      const newHeaders = headerContent.map((content) => ({ text: content, value: content }));
      setHeaders(newHeaders);
    } else {
      const newHeaders = Object.keys(headerContent).map((key) => ({ text: headerContent[key], value: key }));
      setHeaders(newHeaders);
    }
    if (bodyContent && bodyContent.length) {
      const newBodys = bodyContent;
      setBodys(newBodys);
    }
  }, [headerContent, bodyContent]);

  return (
    <div>
      <div className={`${style.table}`}>
        <span className={`${style.title}`}>{title}</span>

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
                      <div
                        style={{
                          wordBreak: 'break-all',
                        }}
                      >
                        {(body as Record<string, string>)[header.text].includes('newnew') && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Tag type="new" />
                            {(body as Record<string, string>)[header.text].replace('newnew', '')}
                          </div>
                        )}
                        {(body as Record<string, string>)[header.text].includes('chacha') && (
                          <div>
                            <Tag type="change" />
                            {(body as Record<string, string>)[header.text].replace('chacha', '')}
                          </div>
                        )}
                        {!(body as Record<string, string>)[header.text].includes('newnew') &&
                          !(body as Record<string, string>)[header.text].includes('chacha') &&
                          (body as Record<string, string>)[header.text]}
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
