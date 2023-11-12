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
  const removeApiPrefix = (address: string) => {
    const prefix = 'https://k9c201.p.ssafy.io/api';
    return address.replace(prefix, '');
  };

  return (
    <button type="button" onClick={() => onGoDetailHandler(apiId)} className="flex flex-col itdaText">
      <div style={{ fontSize: '1.04rem' }}>{apiName}</div>
      <div className="text-xs itdaSecondary text-start">{removeApiPrefix(apiAddress)}</div>
    </button>
  );
}

export default ApiCard;
