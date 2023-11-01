import React, { useState, FormEvent } from 'react';
import Input from '@/components/atoms/Input';
import BorderCard from '@/components/atoms/BorderCard';
import { ChangePassword } from '@/utils/axios/auth';
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

function ChangePasswordBox() {
  const [originalPassword, setOriginalPassword] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    ChangePassword({ originalPassword, changePassword });
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        <Icon />
        <div className="ml-2 text-lg itdaText text-semibold">개인정보 확인</div>
      </div>
      <div className="text-sm itdaSecondary ml-8 mb-6">영문자, 숫자, 특수문자를 포함한 10자리 이상으로 입력하세요</div>
      <div className="ml-8">
        <form onSubmit={onSubmitHandler}>
          <BorderCard>
            <div className="flex items-center gap-4 mx-4 my-1">
              <div className="w-3/12 text-start itdaSecondary">현재 비밀번호</div>
              <Input
                isPassword
                backgroundColor="bgItdaInput"
                inputWord={originalPassword}
                onChange={setOriginalPassword}
                placeholder="현재 비밀번호를 입력하세요"
              />
            </div>

            <div className="flex items-center gap-4 mx-4 my-1">
              <div className="w-3/12 text-start itdaSecondary">새 비밀번호</div>
              <Input
                isPassword
                backgroundColor="bgItdaInput"
                inputWord={changePassword}
                onChange={setChangePassword}
                placeholder="새로운 비밀번호를 입력하세요"
              />
            </div>

            <div className="flex items-center gap-4 mx-4 my-1">
              <div className="w-3/12 text-start itdaSecondary">새 비밀번호 확인</div>
              <Input
                isPassword
                backgroundColor="bgItdaInput"
                inputWord={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="새로운 비밀번호를 한 번 더 입력하세요"
              />
            </div>
          </BorderCard>
          <div className="flex justify-end">
            <div className="w-1/5 mt-3">
              <StyledButton type="submit" variant="solid" radius="full" label="비밀번호 변경" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordBox;
