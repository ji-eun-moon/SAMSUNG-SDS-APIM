export interface BaseNoticeProps {
  type: 'receive' | 'send' | 'main';
}

export interface IReceiveNoticeDetail {
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

export interface ReceiveNoticeProps extends BaseNoticeProps {
  notice: IReceiveNoticeDetail;
}

export interface SendNoticeProps extends BaseNoticeProps {
  notice: ISendNoticeDetail;
}

export type NoticeDetailProps = ReceiveNoticeProps | SendNoticeProps;
