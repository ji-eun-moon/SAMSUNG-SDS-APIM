export interface NavBarProps {
  position: 'top' | 'side';
}

export interface IDropdownItem {
  title: string;
  icon: React.ReactNode;
  url: string;
}

export interface ProfileImgProps {
  src: string;
  width: number;
  height: number;
}
