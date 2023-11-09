import { IPageable, INoticeSend } from '@/types/Notice';
import axiosInstance from './axiosInstance';

export async function getReceiveList({ page, size }: IPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/receive/all',
      params: {
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSendList({ page, size }: IPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/send/all',
      params: {
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateNoticeRead(noticeIds: number[]) {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/member/notice/receive/read',
      data: {
        list: noticeIds,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteReceiveNotice(noticeIds: number[]) {
  try {
    const response = await axiosInstance({
      method: 'DELETE',
      url: '/member/notice/receive/delete',
      data: {
        list: noticeIds,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteSendNotice(noticeIds: number[]) {
  try {
    const response = await axiosInstance({
      method: 'DELETE',
      url: '/member/notice/send/delete',
      data: {
        list: noticeIds,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReceiveNoticeDetail(noticeId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: `/member/notice/receive/${noticeId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSendNoticeDetail(noticeId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: `/member/notice/send/${noticeId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNoticeCnt() {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/receive/unread-count',
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUnreadReceiveNotice({ page, size }: IPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/receive/unread',
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendNotice({ memberIds, title, content }: INoticeSend) {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/member/notice/send',
      data: {
        memberIds,
        title,
        content,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchMember(name: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/auth/find-by-name',
      params: {
        name,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReceiveReadList({ page, size }: IPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/receive/read',
      params: {
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReceiveUnreadList({ page, size }: IPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/receive/unread',
      params: {
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSendReadList({ page, size }: IPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/send/read',
      params: {
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSendUnreadList({ page, size }: IPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/notice/send/unread',
      params: {
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}