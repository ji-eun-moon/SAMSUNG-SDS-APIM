import React from 'react';

/**
 * 차트 프레임
 * @param width 너비
 * @param height 높이
 * @param title 타이틀
 * @param fontsize 폰트 크기
 */

interface ChartFrameProps {
  title: string;
  children: React.ReactElement;
}

function ChartFrame({ title, children }: ChartFrameProps) {
  return (
    <div className="border relative border-gray-400 rounded-lg bg-white pt-4">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-8 text-xl itdaText bg-white">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default ChartFrame;
