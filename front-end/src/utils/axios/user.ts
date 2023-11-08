import { TUserDataList, Pageable, TeamPageable } from '@/types/User';
import axiosInstance from './axiosInstance';

export async function getUserInfo() {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/auth/mypage',
    });
    console.log('userInfo', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMembers({ page, size }: Pageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/auth/all',
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

export async function createMembers(props: TUserDataList) {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/member/auth/sign-up',
      data: props,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTeamInfo({ teamName, page, size }: TeamPageable) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/team/members',
      params: {
        teamName,
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

export async function getTeamToken(teamName: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/member/team/tokens',
      params: {
        teamName,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
