import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IItem {
  title: string;
  icon: string;
  onClick: () => void;
}

interface DropDownProps {
  list: IItem[];
}

function DropDown({ list }: DropDownProps) {
  // const router = useRouter();
  // const list = [
  //   {
  //     title: '메인',
  //     icon: '/icons/home.png',
  //     onClick: router.push('/')
  //   },
  //   {
  //     title: '로그아웃', 

  //   }
  // ];
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" style={{ minWidth: '0', borderRadius: '9999px' }}>
          <Image src="/icons/dropdown.png" alt="dropdown-icon" width={20} height={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        {list?.map((item) => (
          <DropdownItem
            key={item.title}
            onClick={item.onClick}
            startContent={<Image src={`/icons/${item.icon}.png`} alt="icon" width={13} height={13} />}
            // startContent={<Image src="/icons/home.png" alt="icon" width={13} height={13} />}
          >
            {item.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDown;
