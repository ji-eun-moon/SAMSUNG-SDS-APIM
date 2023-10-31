import React, { useEffect, useState } from 'react';
import style from './ColTable.module.scss';

interface ColTableProps {
  headerContent: string[];
  bodyContent: (string[] | number[] | Date[] | { [key: string]: string | number | Date })[];
}

/**
 * ColTable 컴포넌트
 * @param {[]} headerContent - ColTable header 지정
 * @param {[]} bodyContent - ColTable body 지정
 */

function ColTable({ headerContent, bodyContent }: ColTableProps) {
  const [headers, setHeaders] = useState<Array<{ text: string; value: string }>>([]);
  const [bodys, setBodys] = useState<
    null | (string[] | number[] | Date[] | { [key: string]: string | number | Date })[]
  >(null);

  useEffect(() => {
    // headerContent 값 받아오기
    if (Array.isArray(headerContent)) {
      const newHeaders = headerContent.map((content) => ({ text: content, value: content }));
      setHeaders(newHeaders);
    } else {
      const newHeaders = Object.keys(headerContent).map((key) => ({ text: headerContent[key], value: key }));
      setHeaders(newHeaders);
    }

    // bodyContent 값 받아오기
    if (bodyContent && bodyContent.length) {
      const newBodys = bodyContent;
      setBodys(newBodys);
    }
  }, [headerContent, bodyContent]);

  return (
    <table className={`${style.table}`}>
      <thead className={`${style.header}`}>
        <tr>{headers && headers.map((header) => <th key={header.text}>{header.text}</th>)}</tr>
      </thead>
      <tbody className="bg-white">
        {bodys &&
          bodys.map((body) => (
            <tr key={JSON.stringify(body)} className={`${style.body}`}>
              {headers &&
                headers.map((header) => <td key={header.text}>{(body as Record<string, string>)[header.value]}</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ColTable;
