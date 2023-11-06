import { INotice } from '../Notice';

export interface NoticeListProps {
  noticeList: INotice[] | null;
  checkedItems: number[];
  setCheckedItems: (list: number[]) => void;
  selectRead: (list: number[]) => void;
  selectDelete: (list: number[]) => void;
}
