import React from 'react';
import styles from './BorderCard.module.scss';

interface BorderCardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function BorderCard({ children, onClick }: BorderCardProps) {
  const cardClasses = [styles.border];

  if (onClick !== undefined) {
    cardClasses.push(styles.hover);
    cardClasses.push('cursor-none');
  }

  return (
    <button type="button" className={`p-3 flex flex-col rounded w-full ${cardClasses.join(' ')}`} onClick={onClick}>
      <div className="w-full">{children}</div>
    </button>
  );
}

BorderCard.defaultProps = {
  onClick: undefined,
};

export default BorderCard;
