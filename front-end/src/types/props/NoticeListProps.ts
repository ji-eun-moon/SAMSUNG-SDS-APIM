import { INotice } from '../Notice';

export interface NoticeListProps {
  type: 'receive' | 'send';
  noticeList: INotice[] | undefined;
  selectRead: (list: number[]) => void;
  selectDelete: (list: number[]) => void;
}

export interface BaseNoticeProps {
  position: 'nav' | 'page';
  type: 'receive' | 'send';
}
export interface PageNoticeProps extends BaseNoticeProps {
  noticeInfo: INotice;
  isSelected: boolean;
  onCheckboxToggle: () => void;
}

export interface NavBarNoticeProps extends BaseNoticeProps {
  noticeInfo: INotice;
}

export type NoticeProps = PageNoticeProps | NavBarNoticeProps;
