export interface IFrom {
  fromName: string;
  fromImgUrl: string;
}

export interface IFromDetail extends IFrom {
  fromEmployeeId: string;
  fromDepartment: string;
  fromPosition: string;
}

export interface INotice {
  noticeId: number;
  from: IFrom[];
  check: boolean;
  title: string;
  createdAt: Date;
}

export type TNoticeList = INotice[];

export interface INoticeDetail {
  title: string;
  content: string;
  from: IFromDetail[];
  createdAt: Date;
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
