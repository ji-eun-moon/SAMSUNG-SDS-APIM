import React from 'react';

interface SearchBarProps {
  width?: string;
  keyword?: string;
  onSearchHandler: () => void;
}

function SearchBar({ width, keyword, onSearchHandler }: SearchBarProps) {
  return (
    <div className={`bg-white p-3 rounded-xl border-2 border-gray-400 flex ${width}`}>
      <input type="search" value={keyword} className="mx-1 outline-none flex-grow" />
      <svg
        className="w-6 h-6 ml-3 text-gray-400 dark:text-white self-center"
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
    </div>
  );
}

SearchBar.defaultProps = {
  width: 'w-64',
  keyword: '',
};

export default SearchBar;
