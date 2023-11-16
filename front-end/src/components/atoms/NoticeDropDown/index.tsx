import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

interface NoticeDropDownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

function NoticeDropDown({ trigger, children }: NoticeDropDownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        itemClasses={{
          base: ['data-[hover=true]:bg-default-0'],
        }}
      >
        <DropdownItem isReadOnly key="profile">
          {children}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default NoticeDropDown;
