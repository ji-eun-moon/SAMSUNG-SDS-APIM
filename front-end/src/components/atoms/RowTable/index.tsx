import React, { useEffect, useState } from 'react';
import { IUser } from '@/types/User';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
import { RadioGroup, Radio } from '@nextui-org/react';
import TextArea from '@/components/atoms/TextArea';
import { RowTableProps } from '@/types/props/RowTableProps';
import style from './RowTable.module.scss';
import Tag from '../Tag';

/**
 * RowTable 컴포넌트
 * @param {string} type - RowTable 타입(사용/제공)
 * @param {string} title - RowTable 제목
 * @param {[]} headerContent - RowTable 왼쪽 값(header)
 * @param {[]} bodyContent - RowTable 오른쪽 값(body)
 */

function RowTable({ type, title, headerContent, bodyContent, onApproveDeny }: RowTableProps) {
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  const [headers, setHeaders] = useState<Array<{ text: string; value: string }>>([]);
  const [bodys, setBodys] = useState<
    null | (string[] | number[] | Date[] | { [key: string]: string | number | Date })[]
  >(null);
  const [selected, setSelected] = React.useState('accept');
  const [contents, setContents] = useState('');

  const onSelectChange = (value: string) => {
    console.log('e는?', value);
    if (selected !== value) setContents('');
  };

  const renderContent = (
    body: string[] | number[] | Date[] | { [key: string]: string | number | Date },
    header: { text: string },
  ): React.ReactNode => {
    const bodyText = (body as Record<string, string>)[header.text] || '';

    if (bodyText.includes('newnew')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Tag type="new" />
          {bodyText.replace('newnew', '')}
        </div>
      );
    }

    if (bodyText.includes('chacha')) {
      return (
        <div>
          <Tag type="change" />
          {bodyText.replace('chacha', '')}
        </div>
      );
    }

    if (userInfo?.authority === '관리자' && bodyText.includes('대기')) {
      if (header.text === '처리상태') {
        return (
          <RadioGroup color="secondary" value={selected} onValueChange={setSelected}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Radio value="accept" onClick={() => onSelectChange('accept')}>
                승인
              </Radio>
              <Radio value="deny" onClick={() => onSelectChange('deny')}>
                거절
              </Radio>
            </div>
          </RadioGroup>
        );
      }

      if (header.text === '처리내용') {
        return selected === 'accept' ? (
          <div style={{ padding: '10px 0px' }}>
            <TextArea
              width="w-full"
              backgroundColor="#ffffff"
              textAreaWord={contents}
              placeholder={type === '사용' ? '사용 신청이 승인되었습니다' : '서버 주소를 입력하세요'}
              onChange={(e) => {
                console.log('eeeeeeeeeeeeeeeee', e);
                setContents(e);
                onApproveDeny('accept', e);
              }}
            />
          </div>
        ) : (
          <div style={{ padding: '10px 0px' }}>
            <TextArea
              width="w-full"
              backgroundColor="#ffffff"
              textAreaWord={contents}
              placeholder="거절 사유를 입력하세요"
              onChange={(e) => {
                console.log('eeeeeeeeeeeeeeeee', e);
                setContents(e);
                onApproveDeny('deny', e);
              }}
            />
          </div>
        );
      }
    }

    return bodyText;
  };

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

  useEffect(() => {
    onApproveDeny(selected, contents);
  });
  return (
    <div>
      <div className={`${style.table}`}>
        <span className={`${style.title}`}>{title}</span>
        {headers &&
          bodys &&
          bodys.map((body) => (
            <div key={JSON.stringify(body)} style={{ width: '100%' }}>
              {headers &&
                headers.map((header, index) => (
                  <div className={`${style.row}`} key={header.text}>
                    <div className={`${style.left}`} style={index === 0 ? { borderTop: '1px solid #9a9a9a' } : {}}>
                      <span>{header.text}</span>
                    </div>
                    <div
                      className={`${style.right}`}
                      style={index === 0 ? { borderTop: '1px solid #9a9a9a', width: '100%' } : {}}
                    >
                      <div style={{ wordBreak: 'break-all', width: '90%' }}>{renderContent(body, header)}</div>
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
