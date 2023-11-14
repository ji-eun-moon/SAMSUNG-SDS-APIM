import { IUseApply } from '@/types/Apply';
import axiosInstance from './axiosInstance';

// 사용신청 내역(사원)
export async function getUseApplyList(teamName: string, clickPage: number, state: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/use/team',
      params: {
        teamName,
        state,
        page: clickPage,
        size: 9,
      },
    });
    console.log('사용신청내역', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 사용 신청 내역 상세(사원)
export async function getUseApplyDetail(useId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: `/submit/use/${useId}`,
    });
    console.log('사용신청내역상세', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 사용신청 내역(관리자)
export async function getAdminUseApplyList(clickPage: number, state: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/use',
      params: {
        state,
        page: clickPage,
        size: 9,
      },
    });
    console.log('사용신청내역(관리자)', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

//--------------------------------------------------------------------------------------------------------

interface Params {
  teamName: string;
  serverName: string;
  description: string;
  endpoint: string;
}

// 제공신청하기
export async function postProvideApply({ teamName, serverName, description, endpoint }: Params) {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/submit/provide/register',
      data: {
        teamName,
        serverName,
        description,
        endpoint,
      },
    });
    console.log('제공신청하기', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 제공신청 내역(사원)
export async function getProvideApplyList(teamName: string, clickPage: number, state: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/provide/team',
      params: {
        teamName,
        state,
        page: clickPage,
        size: 9,
      },
    });
    console.log('제공신청내역', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 제공 신청 내역 상세(사원)
export async function getProvideApplyDetail(provideId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: `/submit/provide/${provideId}`,
    });
    console.log('제공신청내역상세', response.data.content);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 제공신청 내역(관리자)
export async function getAdminProvideApplyList(clickPage: number, state: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/provide',
      params: {
        state,
        page: clickPage,
        size: 9,
      },
    });
    console.log('제공신청내역(관리자)', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

export async function submitUseApply({ teamName, categoryId, content }: IUseApply) {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/submit/use/register',
      data: {
        teamName,
        categoryId,
        content,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
