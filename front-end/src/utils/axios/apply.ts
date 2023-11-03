import axiosInstance from './axiosInstance';

// 사용신청 내역
export async function getUseApplyList(clickPage: number) {
  console.log('hi');
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/use/team',
      params: {
        teamName: 'project4',
        state: '대기',
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

// 사용 신청 내역 상세
export async function getUseApplyDetail(useId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: `/submit/use/${useId}`,
    });
    console.log('사용신청내역상세', response.data.content);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 제공신청 내역
export async function getProvideApplyList(clickPage: number) {
  console.log('provide');
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/provide/team',
      params: {
        teamName: 'project4',
        state: '대기',
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

// 제공 신청 내역 상세
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
