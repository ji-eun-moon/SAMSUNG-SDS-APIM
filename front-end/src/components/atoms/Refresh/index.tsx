import React from 'react';

interface Props {
  onClick: () => void;
}

function Refresh({ onClick }: Props) {
  return (
    <div onClick={onClick} aria-hidden className="bg-white w-fit p-1 border-1 rounded-lg cursor-pointer">
      <svg
        className="w-5 h-5 text-gray-400 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
        />
      </svg>
    </div>
  );
}

export default Refresh;
