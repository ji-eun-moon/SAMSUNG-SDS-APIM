import React from 'react';

interface ButtonProps {
  type: 'rounded' | 'outlined' | 'straight';
  label: string | React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onButton: () => void;
}

/**
 * 버튼 컴포넌트
 * @param {string} type - 버튼 타입 지정
 * @param {string} label - 버튼 라벨
 * @param {string} backgroundColor - 버튼 배경색
 * @param {string} borderColor - 버튼 테두리 색
 * @param {string} textColor - 버튼 라벨 텍스트 색
 * @param {function} onButton - 버튼 클릭 시 동작할 함수
 */

function Button({ type, label, backgroundColor, borderColor, textColor, onButton }: ButtonProps) {
  const buttonStyle = () => {
    if (type === 'rounded') {
      return `rounded-3xl border text-white px-4 ${backgroundColor} ${borderColor}`;
    }
    if (type === 'outlined') {
      return `rounded-3xl border ${borderColor} ${textColor}`;
    }
    if (type === 'straight') {
      return `rounded-xl border text-white ${backgroundColor} ${borderColor}`;
    }
    return null;
  };

  return (
    <button type="button" className={`px-4 py-1 text-sm ${buttonStyle()}`} onClick={onButton}>
      {label}
    </button>
  );
}

Button.defaultProps = {
  backgroundColor: 'bg-blue-500',
  textColor: 'text-blue-500',
  borderColor: 'border-blue-500',
};

export default Button;
