import { IUser } from '@/types/User';
import axiosInstance from './axiosInstance';

export async function getUserInfo() {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/auth/mypage',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMemebers() {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: 'https://k9c201.p.ssafy.io/api/member/auth/all',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createMembers(props: IUser) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: 'https://k9c201.p.ssafy.io/api/member/auth/sign-up',
      data: props,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
