import React from 'react';

interface MemberNameProps {
  name: string;
  memberId: number;
  onClick: (memberId: number) => void;
}

const Icon = () => (
  <svg
    className="w-2 h-2 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    style={{ color: '#9a9a9a' }}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
    />
  </svg>
);

function MemberName({ name, memberId, onClick }: MemberNameProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(memberId)}
      className="bgItdaBorder px-3 py-1 rounded-full flex mr-2 items-center"
      style={{ backgroundColor: '#F3F3F3' }}
    >
      <div className="mr-2 text-sm">{name}</div>
      <Icon />
    </button>
  );
}

export default MemberName;
