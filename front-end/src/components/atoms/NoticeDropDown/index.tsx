import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import Image from 'next/image';
import styles from './NoticeDropDown.module.scss';

interface NoticeDropDownProps {
  children: React.ReactNode;
}

function NoticeDropDown({ children }: NoticeDropDownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button type="button" className={styles.button}>
          <Image src="/icons/notice.png" alt="dropdown-icon" width={20} height={20} />
        </button>
      </DropdownTrigger>
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
