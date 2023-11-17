import React, { useState } from 'react';

interface TextAreaProps {
  width?: string;
  backgroundColor?: string;
  textAreaWord: string;
  placeholder: string;
  height?: string;
  maxLength?: number;
  onChange: (value: string) => void;
}

/**
 * TextArea 컴포넌트
 * @param {string} width - TextArea 가로 길이
 * @param {string} backgroundColor - TextArea 배경색
 * @param {string} textAreaWord - TextArea 입력값
 * @param {string} placeholder - TextArea placeholder
 */

function TextArea({ width, height, backgroundColor, textAreaWord, placeholder, maxLength, onChange }: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) {
      // 최대 글자 수를 초과하는 경우 입력을 제한
      return;
    }
    onChange(newValue); // 입력 값 변경 시 부모 컴포넌트로 전달
  };
  return (
    <textarea
      value={textAreaWord}
      placeholder={placeholder}
      style={{ fontSize: '0.9rem' }}
      className={`${width} ${height} ${backgroundColor} rounded-lg border-2 ${
        isFocused ? 'border-blue-500' : 'border-gray-200'
      } flex items-center h-5/6 px-2 py-2`}
      onFocus={() => setIsFocused(true)} // 포커스되면 상태를 true로 변경
      onBlur={() => setIsFocused(false)} // 포커스가 없어지면 상태를 false로 변경
      onChange={handleInputChange}
    />
  );
}

TextArea.defaultProps = {
  width: 'w-64',
  backgroundColor: 'bg-white',
  height: '',
  maxLength: null,
};

export default TextArea;
