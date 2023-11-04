export interface IProvideApply {
  teamId: number;
  serverName: string;
  description: string;
  endpoint: string;
}

export interface IUseApply {
  teamId: number;
  description: string | null;
  categoryId: number;
}

export interface ICheckApplyAvailable {
  categoryId: number;
  teamName: string;
}

export interface IProvide {
  provideId: string | number;
  applyType: string;
  serverName: string;
  teamName: string;
  providerName: string;
  createdAt: Date;
  state: '승인' | '대기' | '거절' | string;
}

export type TProvideList = IProvide[];

export interface IResponseProvide {
  content: TProvideList;
  totalPages: number;
}

export interface IUse {
  useApplyId: number;
  categoryName: string;
  teamName: string;
  userName: string;
  createdAt: Date;
  state: '승인' | '대기' | '거절';
}

export type TUseList = IUse[];

export interface IProvideDetail extends IProvide {
  description: string;
  denyReason: string;
  apiDocs: string;
}

export interface IUseDetail extends IUse {
  description: string;
  failReason: string;
}
