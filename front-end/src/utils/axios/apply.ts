import axiosInstance from './axiosInstance';

// 사용신청 내역(사원)
export async function getUseApplyList() {
  console.log('hi');
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/use/team',
      params: {
        teamName: 'teamA',
        page: 0,
        size: 5,
      },
    });
    console.log('사용신청내역', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 제공신청 내역(사원)
export async function getProvideApplyList(clickPage: number, state: string) {
  console.log('provide');
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/provide/team',
      params: {
        teamName: 'project4',
        state,
        page: clickPage,
        size: 10,
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
  console.log('provide');
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/provide',
      params: {
        state,
        page: clickPage,
        size: 10,
      },
    });
    console.log('제공신청내역(관리자)', response.data);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}