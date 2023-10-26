import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

interface SelectBoxProps {
  list: string[];
  onClick: () => void;
}

function ApiCard({ list, onClick }: SelectBoxProps) {
  return (
    <Select variant="bordered" labelPlacement="outside" defaultSelectedKeys={[list[0]]} className="w-full">
      {list.map((item) => (
        <SelectItem key={item} onClick={onClick}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
}

export default ApiCard;
