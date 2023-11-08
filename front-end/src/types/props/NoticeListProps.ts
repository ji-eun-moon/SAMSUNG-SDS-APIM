import { INotice, ISendNotice } from '../Notice';

export interface NoticeListProps {
  checkedItems: number[];
  onClickHandler: (item: string) => void;
  setCheckedItems: (list: number[]) => void;
  selectRead: (list: number[]) => void;
  selectDelete: (list: number[]) => void;
}

export interface TypeNoticeProps {
  type: 'receive' | 'send';
  checkedItems: number[];
  category: string;
  onClickHandler: (item: string) => void;
  setCheckedItems: (list: number[]) => void;
  selectDelete: (list: number[]) => void;
}
export interface SendNoticeListProps extends TypeNoticeProps {
  noticeList: ISendNotice[] | null;
}

export interface ReceiveNoticeListProps extends TypeNoticeProps {
  noticeList: INotice[] | null;
  selectRead: (list: number[]) => void;
}

export interface BaseNoticeProps {
  position: 'nav' | 'page';
  type: 'receive' | 'send';
}

export interface ReceiveNoticeProps extends BaseNoticeProps {
  noticeInfo: INotice;
  isSelected: boolean;
  category: string;
  onCheckboxToggle: () => void;
}

export interface SendNoticeProps extends BaseNoticeProps {
  noticeInfo: ISendNotice;
  isSelected: boolean;
  category: string;
  onCheckboxToggle: () => void;
}

export interface NavBarNoticeProps extends BaseNoticeProps {
  noticeInfo: INotice;
}

export type NoticeProps = ReceiveNoticeProps | SendNoticeProps | NavBarNoticeProps;

export type ListProps = SendNoticeListProps | ReceiveNoticeListProps;
