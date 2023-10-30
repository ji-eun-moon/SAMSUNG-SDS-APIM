import React, { useEffect, useState } from 'react';
import style from './ColTable.module.scss';

interface Person {
  이름: string;
  성별: '남' | '여';
  나이: number;
  [key: string]: string | number;
}

interface ColTableProps {
  headerContent: string[];
  bodyContent: Person[];
}

/**
 * ColTable 컴포넌트
 * @param {[]} headerContent - ColTable header 지정
 * @param {[]} bodyContent - ColTable body 지정
 */

function ColTable({ headerContent, bodyContent }: ColTableProps) {
  const [headers, setHeaders] = useState<Array<{ text: string; value: string }>>([]);
  const [bodys, setBodys] = useState<Person[]>([]);

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
    <table className={`${style.table}`}>
      <thead className={`${style.header}`}>
        <tr>{headers && headers.map((header) => <th key={header.text}>{header.text}</th>)}</tr>
      </thead>
      <tbody className="bg-white">
        {bodys &&
          bodys.map((body) => (
            <tr key={JSON.stringify(body)} className={`${style.body}`}>
              {headers && headers.map((header) => <td key={header.text}>{body[header.text as keyof Person]}</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ColTable;
