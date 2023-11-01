import React from 'react';
import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';

interface ToolTipProps {
  children: React.ReactNode;
}

function ToolTip({ children }: ToolTipProps) {
  return (
    <Tooltip showArrow content={children} className="flex">
      <span>
        <Image src="/icons/tooltip.png" alt="tooltip-icon" width={15} height={15} />
      </span>
    </Tooltip>
  );
}

export default ToolTip;
