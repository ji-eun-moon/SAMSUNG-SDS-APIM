import React from 'react';
import BorderCard from '@/components/atoms/BorderCard';
import ToolTip from '@/components/atoms/ToolTip';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  explain: string;
  onClick: () => void;
}

function ChartCard({ title, children, explain, onClick }: ChartCardProps) {
  return (
    <BorderCard onClick={onClick}>
      <div className="flex align-center">
        <div className="font-bold pr-2">{title}</div>
        <ToolTip explain={explain} />
      </div>
      <div>{children}</div>
    </BorderCard>
  );
}

export default ChartCard;
