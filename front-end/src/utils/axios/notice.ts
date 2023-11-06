import axiosInstance from './axiosInstance';
import { IPageable } from '@/types/Notice';

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

export async function getNoticeDetail(noticeId: number) {
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
