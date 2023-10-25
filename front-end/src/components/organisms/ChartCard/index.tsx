import React from 'react';
import ToolTip from '@/components/atoms/ToolTip';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  explain: string;
  onClick: () => void;
}

const border = {
  border: '1px solid #CCC',
};

function ChartCard({ title, children, explain, onClick }: ChartCardProps) {
  return (
    <button type="button" className="p-3 flex flex-col rounded w-full" style={border} onClick={onClick}>
      <div className="flex">
        <div className="font-bold">{title}</div>
        <ToolTip explain={explain} />
      </div>
      <div>{children}</div>
    </button>
  );
}

export default ChartCard;
