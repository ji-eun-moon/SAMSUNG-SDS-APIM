import React, { useState } from 'react';

interface InputProps {
  // width?: string;
  backgroundColor?: string;
  isPassword: boolean; // isPassword prop 추가
  inputWord: string;
  placeholder: string;
  onChange: (value: string) => void;
}

/**
 * Input 컴포넌트
 * @param {string} width - input 창 가로 길이
 * @param {string} backgroundColor - input 창 배경색
 * @param {boolean} isPassword - 비밀번호 창인지 boolean 값
 * @param {string} inputWord - input 창 내용
 * @param {string} placeholder - input 창 placeholder
 */

function Input({ backgroundColor, isPassword = false, inputWord, placeholder, onChange }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const onVisibleHandler = () => {
    setVisible(!visible);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue); // 입력 값 변경 시 부모 컴포넌트로 전달
  };

  return (
    <div
      className={`${backgroundColor} w-full rounded-lg border-2 ${
        isFocused ? 'border-black' : 'border-gray-200'
      } flex items-center h-10`}
    >
      <input
        type={isPassword && !visible ? 'password' : 'text'} // 비밀번호 표시 조건 추가
        value={inputWord}
        placeholder={placeholder}
        className={`mx-1 w-full outline-none flex-grow px-2 ${backgroundColor}`}
        style={{ fontSize: '0.9rem', backgroundColor: `${backgroundColor}` }}
        onFocus={() => setIsFocused(true)} // 포커스되면 상태를 true로 변경
        onBlur={() => setIsFocused(false)} // 포커스가 없어지면 상태를 false로 변경
        onChange={handleInputChange}
      />
      {isPassword && ( // isPassword가 true일 때만 아이콘 표시
        <span
          className="w-8 h-8 self-center cursor-pointer flex items-center"
          onClick={onVisibleHandler}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onVisibleHandler();
              e.preventDefault(); // "Space" 키의 기본 동작을 방지
            }
          }}
          role="button" // button 역할을 추가
          tabIndex={0} // 키보드 포커스가 가능하게 함
        >
          {visible ? (
            <svg
              className="w-4 h-4 text-gray-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-gray-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
              <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
              <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
            </svg>
          )}
        </span>
      )}
    </div>
  );
}

Input.defaultProps = {
  backgroundColor: '',
};

export default Input;
