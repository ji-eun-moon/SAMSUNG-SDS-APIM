import React from 'react';
import { IApiStatus } from '@/types/Api';
import Status from '@/components/atoms/Status';
import StatusTable from '@/components/organisms/StatusTable';

interface StatusBoxProps {
  statusList: IApiStatus[];
}

function StatusBox({ statusList }: StatusBoxProps) {
  return (
    <div className="ml-8 mt-7 itdaText">
      <div className="w-full mb-3 flex justify-between items-center">
        <div className="text-lg">API 상태확인</div>
        <div className="flex gap-5">
          <div className="flex items-center">
            <Status status="정상" />
            &nbsp;&nbsp;정상작동
          </div>
          <div className="flex items-center">
            <Status status="점검" />
            &nbsp;&nbsp;점검중
          </div>
          <div className="flex items-center">
            <Status status="오류" />
            &nbsp;&nbsp;오류발생
          </div>
        </div>
      </div>
      <StatusTable statusList={statusList} />
    </div>
  );
}

export default StatusBox;
