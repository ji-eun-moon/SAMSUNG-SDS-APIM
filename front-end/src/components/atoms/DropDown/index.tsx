import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { DropDownProps, UrlProps, ModalProps } from '@/types/props/DropDownProps';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { logout } from '@/utils/axios/auth';

function DropDown({ type, ...props }: DropDownProps) {
  const router = useRouter();

  if (type === 'url') {
    const { trigger, list } = props as UrlProps;

    const handleLogout = async () => {
      await logout();
      await router.push(`/login`);
    };

    return (
      <Dropdown>
        <DropdownTrigger>{trigger}</DropdownTrigger>
        <DropdownMenu variant="flat">
          {list?.map((item, index) => (
            <DropdownItem
              showDivider={index === list.length - 2}
              key={item.title}
              onClick={() => {
                if (item.onClickHandler === 'logout') {
                  handleLogout();
                } else {
                  router.push(`${item.onClickHandler}`);
                }
              }}
              startContent={item.icon}
              className={item.type === 'danger' ? 'text-danger' : undefined}
              color={item.type === 'danger' ? 'danger' : undefined}
            >
              {item.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }

  if (type === 'modal') {
    const { trigger, list } = props as ModalProps;
    return (
      <Dropdown>
        <DropdownTrigger>{trigger}</DropdownTrigger>
        <DropdownMenu variant="flat">
          {list?.map((item) => (
            <DropdownItem
              key={item.title}
              onClick={item.onModalHandler}
              startContent={<Image src={`/icons/${item.icon}.png`} alt="icon" width={15} height={15} />}
            >
              {item.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropDown;
