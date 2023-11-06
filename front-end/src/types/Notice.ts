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

export interface INoticeDetail {
  title: string;
  content: string;
  createdAt: string;
  senderId: number;
  senderName: string;
  senderDepartment: string;
  senderPosition: string;
  senderImage: string;
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
  senderId: number;
  title: string;
  senderName: string;
  senderImage: string;
  createdAt: string;
  read: boolean;
}

export interface IPageable {
  page: number;
  size: number;
}
