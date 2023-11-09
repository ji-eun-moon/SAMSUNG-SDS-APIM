import React, { useState, FormEvent } from 'react';
import Input from '@/components/atoms/Input';
import BorderCard from '@/components/atoms/BorderCard';
import { ChangePassword } from '@/utils/axios/auth';
import StyledButton from '@/components/atoms/StyledButton';

// const Icon = () => (
//   <svg
//     className="w-5 h-5 itdaSecondary dark:text-white"
//     aria-hidden="true"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 16 20"
//   >
//     <path
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
//     />
//   </svg>
// );

function ChangePasswordBox() {
  const [originalPassword, setOriginalPassword] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkOriginal, setCheckOriginal] = useState(true);
  const [checkChange, setCheckChange] = useState(true);
  const [checkConfirm, setCheckConfirm] = useState(true);

  const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  const onOriginalHandler = (value: string) => {
    const trimmedValue = value.trim();
    setOriginalPassword(trimmedValue);
    if (trimmedValue === '') {
      setCheckOriginal(false);
    } else {
      setCheckOriginal(true);
    }
  };

  const onChangeHandler = (value: string) => {
    const trimmedValue = value.trim();
    setChangePassword(trimmedValue);
    if (check.test(trimmedValue) === false) {
      setCheckChange(false);
    } else {
      setCheckChange(true);
    }
  };

  const onConfirmHandler = (value: string) => {
    const trimmedValue = value.trim();
    setConfirmPassword(trimmedValue);
    if (trimmedValue !== changePassword) {
      setCheckConfirm(false);
    } else {
      setCheckConfirm(true);
    }
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (checkOriginal && checkChange && checkConfirm) {
      ChangePassword({ originalPassword, changePassword });
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={onSubmitHandler}>
        <div className="flex items-center gap-5 mx-5 mt-2">
          <div className="w-4/12 text-start itdaSecondary mb-5">현재 비밀번호</div>
          <div className="flex flex-col w-full">
            <Input
              isPassword
              backgroundColor="bgItdaInput"
              inputWord={originalPassword}
              onChange={onOriginalHandler}
              placeholder="현재 비밀번호를 입력하세요"
            />
            {checkOriginal ? (
              <div className="text-xs">&nbsp;</div>
            ) : (
              <div className="text-xs text-start ml-3 itdaDanger">현재 비밀번호를 입력하세요</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 mx-5">
          <div className="w-4/12 text-start itdaSecondary mb-5">새 비밀번호</div>
          <div className="flex flex-col w-full">
            <Input
              isPassword
              backgroundColor="bgItdaInput"
              inputWord={changePassword}
              onChange={onChangeHandler}
              placeholder="새로운 비밀번호를 입력하세요"
            />
            {checkChange ? (
              <div className="text-xs">&nbsp;</div>
            ) : (
              <div className="text-xs text-start ml-3 itdaDanger">
                영문자, 숫자, 특수문자를 포함한 10자리 이상으로 입력하세요
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 mx-5">
          <div className="w-4/12 text-start itdaSecondary mb-5">새 비밀번호 확인</div>
          <div className="flex flex-col w-full">
            <Input
              isPassword
              backgroundColor="bgItdaInput"
              inputWord={confirmPassword}
              onChange={onConfirmHandler}
              placeholder="새로운 비밀번호를 한 번 더 입력하세요"
            />
            {checkConfirm ? (
              <div className="text-xs">&nbsp;</div>
            ) : (
              <div className="text-xs text-start ml-3 itdaDanger">비밀번호가 일치하지 않습니다</div>
            )}
          </div>
        </div>
        {/* </BorderCard> */}
        <div className="flex justify-center">
          <div className="w-1/5 mt-3">
            <StyledButton type="submit" variant="solid" radius="full" label="비밀번호 변경" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordBox;
