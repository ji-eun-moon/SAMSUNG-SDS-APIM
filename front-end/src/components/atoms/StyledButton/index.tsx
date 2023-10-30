import React from 'react';
import { Button } from '@nextui-org/react';
import styles from './StyledButton.module.scss';

interface SubmitButton {
  variant: 'solid' | 'bordered';
  label: string | React.ReactNode;
  radius: 'full' | 'lg' | 'sm' | 'none';
  type: 'submit';
}

interface ButtonProps {
  variant: 'solid' | 'bordered';
  label: string | React.ReactNode;
  radius: 'full' | 'lg' | 'sm' | 'none';
  type: 'button';
  onClick: () => void;
}

/**
 * 버튼 컴포넌트
 * @param {string} variant - 버튼 타입
 * @param {string} label - 버튼 라벨
 * @param {string} radius - 버튼 둥근 정도
 * @param {string} type - 버튼 타입
 * @param {Function} onClick - 버튼 클릭 시 동작할 함수
 */

function StyledButton({ type, ...props }: ButtonProps | SubmitButton) {
  if (type === 'submit') {
    const { radius, variant, label } = props as SubmitButton;
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
      <Button radius={radius} variant={variant} className={buttonStyle()} type={type}>
        {label}
      </Button>
    );
  }
  const { radius, variant, label, onClick } = props as ButtonProps;
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
    <Button radius={radius} variant={variant} className={buttonStyle()} type={type} onClick={onClick}>
      {label}
    </Button>
  );
}

export default StyledButton;
