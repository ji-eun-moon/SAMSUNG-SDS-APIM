import React from 'react';
import Image from 'next/image';

interface ApiCardProps {
  title: string;
  category?: string | null;
  address: string;
}

function ApiCard({ title, category, address }: ApiCardProps) {
  return (
    <div className="p-4">
      <div className="flex">
        <div>{title}</div>
        <div>{category}</div>
      </div>
      <div>
        <div>{address}</div>
        <Image src="/icons/next.png" alt="next-icon" width={20} height={20} />
      </div>
    </div>
  );
}

ApiCard.defaultProps = {
  category: null,
};

export default ApiCard;
