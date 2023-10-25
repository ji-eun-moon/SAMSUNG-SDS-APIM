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

interface IProvide {
  provideId: number;
  applyType: '신규' | '변경';
  serverName: string;
  teamName: string;
  providerName: string;
  createdAt: Date;
  state: '승인' | '대기' | '거절';
}

export type TProvideList = IProvide[];

interface IUse {
  useId: number;
  categoryName: string;
  teamName: string;
  userName: string;
  createdAt: Date;
  state: '승인' | '대기' | '거절';
}

export type TUseList = IUse[];

export interface IProvideDetail extends IProvide {
  description: string;
  failReason: string;
  apiDocs: string;
}

export interface IUseDetail extends IUse {
  description: string;
  failReason: string;
}
