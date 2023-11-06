import React from 'react';
import { Input } from '@nextui-org/react';

interface SearchBarProps {
  keyword: string;
  onChange: (keyword: string) => void;
  placeholder: string;
  onSearchHandler: () => void;
}

/**
 * SearchBar 컴포넌트
 * @param {string} width - SearchBar 가로 길이
 * @param {string} keyword - SearchBar 입력값
 * @param {function} onSearchHandler - Search 누르면 동작할 함수
 */

function SearchBar({ placeholder, keyword, onSearchHandler, onChange }: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchHandler();
  };

  return (
    <form onSubmit={onSearch}>
      <Input
        variant="underlined"
        placeholder={placeholder}
        value={keyword}
        onChange={handleInputChange}
        endContent={
          <svg
            className="w-5 h-5 ml-3 text-gray-400 dark:text-white self-center cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            onClick={onSearchHandler}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        }
        className="max-w-xs"
      />
    </form>
  );
}

export default SearchBar;
