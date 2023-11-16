import React, { useState, FormEvent } from 'react';
import Input from '@/components/atoms/Input';
import { ChangePassword } from '@/utils/axios/auth';
import StyledButton from '@/components/atoms/StyledButton';
import Modal from '../Modal';

function ChangePasswordBox() {
  const [originalPassword, setOriginalPassword] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkOriginal, setCheckOriginal] = useState(true);
  const [checkChange, setCheckChange] = useState(true);
  const [checkConfirm, setCheckConfirm] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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

  const onModalHandler = () => {
    setIsModalOpen(!isModalOpen);
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

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (checkOriginal && checkChange && checkConfirm) {
      const res = await ChangePassword({ originalPassword, changePassword });
      if (res === '비밀번호 변경') {
        setAlertMessage('비밀번호가 변경되었습니다');
        setOriginalPassword('');
        setChangePassword('');
        setConfirmPassword('');
        onModalHandler();
      }
      if (res === null) {
        setAlertMessage('현재 비밀번호를 다시 확인하세요');
        setOriginalPassword('');
        setChangePassword('');
        setConfirmPassword('');
        onModalHandler();
      }
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
        <div className="flex justify-end mr-5">
          <div className="w-1/5 mt-4">
            <StyledButton type="submit" variant="solid" radius="sm" label="비밀번호 변경" />
          </div>
        </div>
      </form>
      {isModalOpen && <Modal type="alert" onClose={onModalHandler} alertMessage={alertMessage} />}
    </div>
  );
}

export default ChangePasswordBox;
