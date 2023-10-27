import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, Button } from '@nextui-org/react';
import Image from 'next/image';

interface CustomDropDownProps {
  children: React.ReactNode;
}

function CustomDropDown({ children }: CustomDropDownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" style={{ minWidth: '0', borderRadius: '9999px' }}>
          <Image src="/icons/dropdown.png" alt="dropdown-icon" width={16} height={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">{children}</DropdownMenu>
    </Dropdown>
  );
}

export default CustomDropDown;
