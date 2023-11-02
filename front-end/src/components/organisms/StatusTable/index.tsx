import React from 'react';
import { IApiStatus } from '@/types/Api';
import StatusTitle from '@/components/atoms/StatusTitle';
import Status from '@/components/atoms/Status';
import styles from './StatusTable.module.scss';

interface StatusTableProps {
  statusList: IApiStatus[];
}

function StatusTable({ statusList }: StatusTableProps) {
  const headers = ['', 'API 이름', '응답시간', '업데이트'];
  const formatUpdatedAt = (dateString: Date) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <table className="w-full">
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '42%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
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
          {statusList?.length > 0 ? (
            statusList.map((list) => (
              <tr key={list.apiId}>
                <td className={styles.tr}>
                  <div className="flex justify-center items-center w-full">
                    <Status status={list.apiStatus} />
                  </div>
                </td>
                <td className={styles.tr}>
                  <StatusTitle apiName={list.apiName} apiAddress={list.apiAddress} apiId={list.apiId} />
                </td>
                <td className={`${styles.tr} text-center`}>{list.responseTime} ms</td>
                <td className={`${styles.tr} text-center`}>{formatUpdatedAt(list.updatedAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center" style={{ height: '60px' }}>
                해당하는 API가 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StatusTable;
