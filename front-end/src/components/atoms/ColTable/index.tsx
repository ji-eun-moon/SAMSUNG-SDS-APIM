import React, { useEffect, useState } from 'react';
import style from './ColTable.module.scss';

interface ColTableProps {
  headerContent: string[];
  bodyContent: (string[] | number[] | Date[] | { [key: string]: string | number | Date })[];
  onGoDetail: (id: string) => void;
}

/**
 * ColTable 컴포넌트
 * @param {[]} headerContent - ColTable header 지정
 * @param {[]} bodyContent - ColTable body 지정
 */

function ColTable({ headerContent, bodyContent, onGoDetail }: ColTableProps) {
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
            <tr
              key={JSON.stringify(body)}
              className={`${style.body}`}
              onClick={() => {
                const id = (body as Record<string, string>).ID;
                if (/^\d+$/.test(id)) {
                  // 정규표현식을 사용하여 숫자로 이루어져 있는지 확인
                  onGoDetail(id);
                }
              }}
            >
              {headers &&
                headers.map((header) => {
                  const cellContent = (body as Record<string, string>)[header.value];
                  let textStyle = ''; // 기본 텍스트 스타일

                  // header.text가 상태일 때 스타일을 변경합니다.
                  if (header.text === '상태') {
                    switch (cellContent) {
                      case '대기':
                        textStyle = 'text-gray-500';
                        break;
                      case '승인':
                        textStyle = 'text-blue-500';
                        break;
                      case '거절':
                        textStyle = 'text-red-500';
                        break;
                      default:
                        break;
                    }
                  }

                  return (
                    <td key={header.text} className={textStyle}>
                      {cellContent}
                    </td>
                  );
                })}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ColTable;
