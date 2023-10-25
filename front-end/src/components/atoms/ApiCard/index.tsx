import React from 'react';
import Image from 'next/image';

interface ApiCardProps {
  title: string;
  category?: string | null;
  address: string;
  onClick: () => void;
}

const border = {
  border: '1px solid #9A9A9A',
};

const iconImg = {
  height: '15px',
  width: '100%',
};

function ApiCard({ title, category, address, onClick }: ApiCardProps) {
  return (
    <button
      type="button"
      className="p-3 flex rounded-md justify-between items-center w-full"
      style={border}
      onClick={onClick}
    >
      <div className="flex items-baseline">
        <div className="itdaText text-base pr-2">{title}</div>
        <div className="itdaSecondary text-sm">{category}</div>
      </div>
      <div className="flex items-center">
        <div className="itdaSecondary text-sm pr-2">{address}</div>
        <Image src="/icons/next.png" alt="next-icon" width={10} height={10} style={iconImg} />
      </div>
    </button>
  );
}

ApiCard.defaultProps = {
  category: null,
};

export default ApiCard;
