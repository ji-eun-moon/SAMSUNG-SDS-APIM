import { IUserInfo } from '../User';

export interface NavBarProps {
  userInfo: IUserInfo;
  position: 'side' | 'top';
}

export interface ProfileImgProps {
  src: string;
  width: number;
  height: number;
}
