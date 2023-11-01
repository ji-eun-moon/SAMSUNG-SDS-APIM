import React from 'react';
import Input from '@/components/atoms/Input';
import BorderCard from '@/components/atoms/BorderCard';
import StyledButton from '@/components/atoms/StyledButton';

const Icon = () => (
  <svg
    className="w-6 h-6 text-gray-500 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
    />
  </svg>
);

function ChangePassword() {
  return (
    <div className="w-full">
      <div className="flex items-center">
        <Icon />
        <div className="ml-2 text-lg itdaText text-semibold">개인정보 확인</div>
      </div>
      <div className="text-sm itdaSecondary ml-8 mb-6">영문자, 숫자, 특수문자를 포함한 10자리 이상으로 입력하세요</div>
      <div className="flex ml-8">
        <BorderCard>
          <div className="w-full px-5 py-2">
            <div className="py-1">
              <Input isPassword backgroundColor="bgItdaInput" />
            </div>
            <div className="py-1">
              <Input isPassword backgroundColor="bgItdaInput" />
            </div>
            <div className="py-1">
              <Input isPassword backgroundColor="bgItdaInput" />
            </div>
          </div>
        </BorderCard>
      </div>
    </div>
  );
}

export default ChangePassword;
