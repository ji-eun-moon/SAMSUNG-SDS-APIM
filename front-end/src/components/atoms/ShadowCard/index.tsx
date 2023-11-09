import React from 'react';

interface ShadowCardProps {
  type: 'small' | 'bordersmall' | 'big';
  children: React.ReactNode;
  bgcolor?: string;
}

/**
 * 버튼 컴포넌트
 * @param {string} type - 카드의 타입지정(border-radius)
 * @param {React.ReactNode} children - 카드 내부에 들어갈 내용
 */
const shadow = {
  boxShadow: '0px 4px 40px 0px rgba(198, 195, 195, 0.25)',
};

function ShadowCard({ type, children, bgcolor }: ShadowCardProps) {
  let classNames = 'bg-white p-2 w-full h-full';

  if (type === 'small') {
    classNames += ' rounded-2xl';
  } else if (type === 'bordersmall') {
    classNames += ' rounded-2xl border';
  } else if (type === 'big') {
    classNames += ' rounded';
  }

  return (
    <div className={classNames} style={{ ...shadow, backgroundColor: bgcolor }}>
      {children}
    </div>
  );
}

ShadowCard.defaultProps = {
  bgcolor: '#ffffff',
};

export default ShadowCard;
