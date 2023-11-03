import React from 'react';
import { IApiStatus } from '@/types/Api';
import { useRouter } from 'next/router';
import Status from '@/components/atoms/Status';
import StatusTable from '@/components/organisms/StatusTable';

interface StatusBoxProps {
  statusList: IApiStatus[];
}

function StatusBox({ statusList }: StatusBoxProps) {
  const router = useRouter();
  return (
    <div className="ml-8 mt-7 itdaText">
      <div className="w-full mb-3 flex justify-between items-center">
        <div className="text-lg">API 상태확인</div>
        <div className="flex gap-5">
          <button type="button" className="flex items-center" onClick={() => router.push('/apis/status?filter=정상')}>
            <Status status="정상" />
            &nbsp;&nbsp;정상작동
          </button>
          <button type="button" className="flex items-center" onClick={() => router.push('/apis/status?filter=점검')}>
            <Status status="점검" />
            &nbsp;&nbsp;점검중
          </button>
          <button type="button" className="flex items-center" onClick={() => router.push('/apis/status?filter=오류')}>
            <Status status="오류" />
            &nbsp;&nbsp;오류발생
          </button>
        </div>
      </div>
      <StatusTable statusList={statusList} />
    </div>
  );
}

export default StatusBox;
