import React from 'react';

interface ShadowCardProps {
  type: 'small' | 'big';
  children: React.ReactNode;
}

/**
 * 버튼 컴포넌트
 * @param {string} type - 카드의 타입지정(border-radius)
 * @param {React.ReactNode} children - 카드 내부에 들어갈 내용
 */
const shadow = {
  boxShadow: '0px 4px 40px 0px rgba(198, 195, 195, 0.25)',
};

function ShadowCard({ type, children }: ShadowCardProps) {
  let classNames = 'bg-white p-4 w-full';

  if (type === 'small') {
    classNames += ' rounded-xl';
  } else if (type === 'big') {
    classNames += ' rounded';
  }

  return (
    <div className={classNames} style={shadow}>
      {children}
    </div>
  );
}

export default ShadowCard;
