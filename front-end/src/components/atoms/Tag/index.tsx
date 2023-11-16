import React from 'react';

interface TagProps {
  type: 'new' | 'change';
}

/**
 * Tag 컴포넌트
 * @param {string} type - Tag의 타입지정
 */

const shadow = {
  boxShadow: '0px 10px 50px 0px rgba(198, 195, 195, 0.25)',
};

function Tag({ type }: TagProps) {
  let word = '';
  let classNames = 'rounded-lg w-fit py-1 px-2 bg-white border text-sm';

  if (type === 'new') {
    word = '신규';
    classNames += ' border-blue-600 text-blue-600';
  } else if (type === 'change') {
    word = '변경';
    classNames += ' border-red-500 text-red-500';
  }
  return (
    <div className={`${classNames}`} style={shadow}>
      {word}
    </div>
  );
}

export default Tag;
