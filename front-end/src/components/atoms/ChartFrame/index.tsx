import React from 'react';

/**
 * 차트 프레임
 * @param width 너비
 * @param height 높이
 * @param title 타이틀
 * @param fontsize 폰트 크기
 */

interface ChartFrameProps {
  children: React.ReactElement;
}

function ChartFrame({ children }: ChartFrameProps) {
  return (
    <div className="border relative border-gray-400 rounded-lg bg-white py-2">
      <div>{children}</div>
    </div>
  );
}

export default ChartFrame;
