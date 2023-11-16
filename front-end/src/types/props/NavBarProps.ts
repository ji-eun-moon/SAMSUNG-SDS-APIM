export interface NavBarProps {
  position: 'top' | 'side';
}

export interface IDropdownItem {
  title: string;
  icon: React.ReactNode;
  type: string;
  onClickHandler: string;
}

export interface ProfileImgProps {
  src: string;
  width: number;
  height: number;
}
