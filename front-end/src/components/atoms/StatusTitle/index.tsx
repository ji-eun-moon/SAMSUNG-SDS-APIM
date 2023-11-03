import React from 'react';
import { useRouter } from 'next/router';

interface StatusTitleProps {
  apiName: string;
  apiAddress: string;
  apiId: number;
}

function ApiCard({ apiName, apiAddress, apiId }: StatusTitleProps) {
  const router = useRouter();
  const onGoDetailHandler = (id: number) => {
    router.push(`/apis/detail/${id}`);
  };
  return (
    <button type="button" onClick={() => onGoDetailHandler(apiId)} className="flex flex-col itdaText">
      <div style={{ fontSize: '1.04rem' }}>{apiName}</div>
      <div className="text-xs itdaSecondary">{apiAddress}</div>
    </button>
  );
}

export default ApiCard;
