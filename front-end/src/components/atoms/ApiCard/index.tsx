import React from 'react';
import Image from 'next/image';
import styles from './ApiCard.module.scss';

interface ApiCardProps {
  title: string;
  category?: string | null;
  address: string;
  onClick: () => void;
}

function ApiCard({ title, category, address, onClick }: ApiCardProps) {
  return (
    <button
      type="button"
      className={`p-3 flex rounded-md justify-between items-center w-full h-14 ${styles.border}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="itdaText text-base pr-2">{title}</div>
        <div className="itdaSecondary text-sm">{category}</div>
      </div>
      <div className="flex items-center justify-center">
        <div className="itdaSecondary text-sm pr-2 w-fit">{address}</div>
        <Image src="/icons/next.png" alt="next-icon" width={10} height={10} className={styles.iconImg} />
      </div>
    </button>
  );
}

ApiCard.defaultProps = {
  category: null,
};

export default ApiCard;
