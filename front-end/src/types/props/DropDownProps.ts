import { IDropdownItem } from '@/types/props/NavBarProps';

export interface UrlProps extends TypeDropDownProps {
  list: IDropdownItem[];
  trigger: React.ReactNode;
  use: string;
  state: string;
}

export interface IMember {
  name: string;
  memberId: number;
}

export interface ModalList {
  title: string;
  icon: React.ReactNode;
  onModalHandler: () => void;
  // memberInfo: IMember;
}

export interface ModalProps extends TypeDropDownProps {
  list: ModalList[];
  trigger: React.ReactNode;
}

export interface TypeDropDownProps {
  type: string;
}

export type DropDownProps = ModalProps | UrlProps;
