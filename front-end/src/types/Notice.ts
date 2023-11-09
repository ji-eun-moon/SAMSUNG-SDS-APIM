export interface IFrom {
  fromName: string;
  fromImgUrl: string;
}

export interface IFromDetail extends IFrom {
  fromEmployeeId: string;
  fromDepartment: string;
  fromPosition: string;
}

export interface TNoticeList {
  content: INotice[];
  totalPages: number;
}
export interface TNoticeSendList {
  content: ISendNotice[];
  totalPages: number;
}

export interface INoticeDetail {
  title: string;
  content: string;
  createdAt: string;
  senderEmployeeId: number;
  senderName: string;
  senderDepartment: string;
  senderPosition: string;
  senderImage: string;
}

export interface ISendNoticeDetail {
  title: string;
  content: string;
  createdAt: string;
  receiverEmployeeId: number;
  receiverName: string;
  receiverDepartment: string;
  receiverPosition: string;
  receiverImage: string;
}

export interface IPostNotice {
  title: string;
  employeeIds: string[];
  content: string;
}

export type TSearchMembers = IFromDetail[];

// 쪽지 읽음 / 삭제
export type TChangeNotice = number[];

// 안읽은 쪽지 수
export type TUncheckedCount = number;

export interface INotice {
  noticeId: number;
  senderEmployeeId: number;
  title: string;
  senderName: string;
  senderImage: string;
  createdAt: string;
  read: boolean;
}

export interface ISendNotice {
  noticeId: number;
  senderEmployeeId: number;
  title: string;
  receiverName: string;
  receiverImage: string;
  createdAt: string;
  read: boolean;
}

export interface IPageable {
  page: number;
  size: number;
}

export interface INoticeSend {
  employeeIds: string[];
  title: string;
  content: string;
}
