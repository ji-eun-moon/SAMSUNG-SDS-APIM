import React, { useState, FormEvent } from 'react';
import Input from '@/components/atoms/Input';
import BorderCard from '@/components/atoms/BorderCard';
import { ChangePassword } from '@/utils/axios/auth';
import StyledButton from '@/components/atoms/StyledButton';

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
      <div className="flex items-center mb-5">
        <div className="ml-2 text-lg itdaText text-semibold">비밀번호 변경</div>
      </div>
      <div className="ml-8">
        <form onSubmit={onSubmitHandler}>
          <BorderCard>
            <div className="flex items-center gap-4 mx-4 mt-2">
              <div className="w-3/12 text-start itdaSecondary mb-3">현재 비밀번호</div>
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

            <div className="flex items-center gap-4 mx-4">
              <div className="w-3/12 text-start itdaSecondary mb-3">새 비밀번호</div>
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

            <div className="flex items-center gap-4 mx-4">
              <div className="w-3/12 text-start itdaSecondary mb-3">새 비밀번호 확인</div>
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
