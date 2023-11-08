import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { DropDownProps, UrlProps, ModalProps } from '@/types/props/DropDownProps';
import { useRouter } from 'next/router';

function DropDown({ type, ...props }: DropDownProps) {
  const router = useRouter();

  if (type === 'url') {
    const { trigger, list } = props as UrlProps;
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

  if (type === 'modal') {
    const {trigger, list} = props as ModalProps;
    return (
      <Dropdown>
        <DropdownTrigger>{trigger}</DropdownTrigger>
        <DropdownMenu variant="flat">
          {list?.map((item) => (
            <DropdownItem key={item.title} onClick={item.onModalHandler} startContent={item.icon}>
              {item.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropDown;
