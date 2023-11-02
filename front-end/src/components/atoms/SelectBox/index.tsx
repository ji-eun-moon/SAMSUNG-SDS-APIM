import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

interface SelectBoxProps {
  list: string[];
  width?: string;
  onChange: (team: string) => void;
}

function SelectBox({ list, width, onChange }: SelectBoxProps) {
  return (
    <Select variant="bordered" labelPlacement="outside" defaultSelectedKeys={[list[0]]} className={width}>
      {list.map((item) => (
        <SelectItem key={item} onClick={() => onChange(item)}>
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
