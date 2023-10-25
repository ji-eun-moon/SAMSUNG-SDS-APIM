import React from 'react';
import { Tooltip } from '@nextui-org/react';
// import Image from 'next/image';

interface ToolTipProps {
  explain: React.ReactNode;
}

function ToolTip({ explain }: ToolTipProps) {
  return (
    <Tooltip showArrow content={explain}>
      {/* <Image src="/icons/tooltip.png" alt="tooltip-icon" width={10} height={10} />; */}
      <span>툴팁</span>
    </Tooltip>
  );
}

export default ToolTip;
