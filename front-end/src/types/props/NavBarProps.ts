import { IUser } from '../User';

export interface SideNavBarProps {
  userInfo: IUser;
  position: 'side';
  noticeCnt: string;
}
export interface TopNavBarProps {
  userInfo: IUser;
  position: 'top';
  noticeCnt: string;
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
