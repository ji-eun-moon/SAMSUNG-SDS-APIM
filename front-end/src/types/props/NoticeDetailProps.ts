export interface BaseNoticeProps {
  type: 'receive' | 'send';
}

export interface IReceiveNoticeDetail {
  title: string;
  content: string;
  createdAt: string;
  senderId: number;
  senderName: string;
  senderDepartment: string;
  senderPosition: string;
  senderImage: string;
}

export interface ISendNoticeDetail {
  title: string;
  content: string;
  createdAt: string;
  receiverId: number;
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
