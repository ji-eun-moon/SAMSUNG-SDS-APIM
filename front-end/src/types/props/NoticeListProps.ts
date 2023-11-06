import { INotice } from '../Notice';

export interface NoticeListProps {
  noticeList: INotice[] | undefined;
  selectRead: (list: number[]) => void;
  selectDelete: (list: number[]) => void;
}
