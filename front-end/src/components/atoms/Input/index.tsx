import React, { useState } from 'react';

interface InputProps {
  width?: string;
  backgroundColor?: string;
}

function Input({ width, backgroundColor }: InputProps) {
  const [inputWord, setInputWord] = useState('');

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
  };
  return (
    <input
      type="text"
      value={inputWord}
      onChange={onInputHandler}
      className={`${width} ${backgroundColor} rounded-lg border-2 border-gray-400 `}
    />
  );
}

Input.defaultProps = {
  width: 'w-64',
  backgroundColor: '',
};

export default Input;
