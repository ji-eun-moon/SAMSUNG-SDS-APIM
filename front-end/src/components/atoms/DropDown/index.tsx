import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { IDropdownItem } from '@/types/props/NavBarProps';
import { useRouter } from 'next/router';

interface DropDownProps {
  list: IDropdownItem[];
  trigger: React.ReactNode;
}

function DropDown({ list, trigger }: DropDownProps) {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu variant="flat">
        {list?.map((item) => (
          <DropdownItem key={item.title} onClick={() => router.push(`${item.url}`)} startContent={item.icon}>
            {item.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDown;
