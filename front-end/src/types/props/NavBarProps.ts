import { IUser } from '../User';

export interface SideNavBarProps {
  userInfo: IUser;
  position: 'side';
  noticeCnt: number;
  firstCategory: number;
}
export interface TopNavBarProps {
  userInfo: IUser;
  position: 'top';
  noticeCnt: number;
  notices: React.ReactNode;
  dropDownList: IItem[];
}

interface IItem {
  title: string;
  icon: string;
  onClick: () => void;
}

export interface ProfileImgProps {
  src: string;
  width: number;
  height: number;
}
