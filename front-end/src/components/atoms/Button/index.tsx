import React from 'react';
import { Button } from '@nextui-org/react';
import styles from './Button.module.scss';

interface ButtonProps {
  variant: 'solid' | 'bordered';
  label: string | React.ReactNode;
  radius: 'full' | 'lg' | 'sm' | 'none';
  onClick: () => void;
}

/**
 * 버튼 컴포넌트
 * @param {string} variant - 버튼 타입
 * @param {string} label - 버튼 라벨
 * @param {string} radius - 버튼 둥근 정도
 * @param {Function} onClick - 버튼 클릭 시 동작할 함수
 */

function StyledButton({ variant, label, radius, onClick }: ButtonProps) {
  const buttonStyle = () => {
    if (variant === 'solid') {
      return styles.basicButton;
    }
    if (variant === 'bordered') {
      return styles.outlinedButton;
    }
    return '';
  };

  return (
    <Button onClick={onClick} radius={radius} variant={variant} className={buttonStyle()}>
      {label}
    </Button>
  );
}

export default StyledButton;
