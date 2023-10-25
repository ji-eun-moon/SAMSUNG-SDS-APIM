import React, { useState } from 'react';

interface TextAreaProps {
  width?: string;
  backgroundColor?: string;
  textAreaWord: string;
  placeholder: string;
}

/**
 * TextArea 컴포넌트
 * @param {string} width - TextArea 가로 길이
 * @param {string} backgroundColor - TextArea 배경색
 * @param {string} textAreaWord - TextArea 입력값
 * @param {string} placeholder - TextArea placeholder
 */

function TextArea({ width, backgroundColor, textAreaWord, placeholder }: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <textarea
      value={textAreaWord}
      placeholder={placeholder}
      className={`${width} ${backgroundColor} rounded-lg border-2 ${
        isFocused ? 'border-blue-500' : 'border-gray-400'
      } flex items-center h-10`}
      onFocus={() => setIsFocused(true)} // 포커스되면 상태를 true로 변경
      onBlur={() => setIsFocused(false)} // 포커스가 없어지면 상태를 false로 변경
    />
  );
}

TextArea.defaultProps = {
  width: 'w-64',
  backgroundColor: 'bg-white',
};

export default TextArea;
