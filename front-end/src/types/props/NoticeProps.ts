import { INotice } from '../Notice';

export interface NoticeProps {
  noticeInfo: INotice;
  isSelected: boolean;
  onCheckboxToggle: () => void;
  onClick: () => void;
}
