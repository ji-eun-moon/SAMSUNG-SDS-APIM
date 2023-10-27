import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

interface SelectBoxProps {
  list: string[];
  width?: string;
  onClick: () => void;
}

function SelectBox({ list, width, onClick }: SelectBoxProps) {
  return (
    <Select variant="bordered" labelPlacement="outside" defaultSelectedKeys={[list[0]]} className={width}>
      {list.map((item) => (
        <SelectItem key={item} onClick={onClick}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
}

SelectBox.defaultProps = {
  width: 'w-full',
};

export default SelectBox;
