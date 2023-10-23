import React from 'react';

interface ButtonProps {
  type: 'fullRounded' | 'emptyRounded' | 'fullStraight';
  children: React.ReactNode;
  backgroundColor?: string;
}

/**
 * 버튼 컴포넌트
 * @param {string} type - 카드의 타입지정(border-radius)
 * @param {React.ReactNode} children - 카드 내부에 들어갈 내용
 * @param {string} backgroundColor - 버튼의 모양 지정
 */

function Button({ type, children, backgroundColor }: ButtonProps) {
  let classNames = 'bg-white p-4';

  if (type === 'fullRounded') {
    classNames += `${backgroundColor} rounded-3xl text-white`;
  } else if (type === 'emptyRounded') {
    classNames += `${backgroundColor} rounded-3xl`;
  } else if (type === 'fullStraight') {
    classNames += `${backgroundColor} rounded-md text-white`;
  }

  return <div className={classNames}>{children}</div>;
}

Button.defaultProps = {
  backgroundColor: 'bg-white',
};

export default Button;
