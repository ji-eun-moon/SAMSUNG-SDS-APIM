import axiosInstance from './axiosInstance';

// 사용신청 내역
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

// 제공신청 내역
export async function getProvideApplyList(currentPage: number) {
  console.log('provide');
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/provide/team',
      params: {
        teamName: 'teamA',
        page: currentPage,
        size: 5,
      },
    });
    console.log('제공신청내역', response.data.content);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return [
      {
        provideId: 1,
        applyType: '신규',
        serverName: 'hi',
        teamName: 'hiTeam',
        providerName: 'hiProv',
        createdAt: '2023-10-31',
        state: '승인',
      },
    ];
  }
}

// 제공 신청 내역 상세
export async function getProvideApplyDetail(provideid: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: `/submit/provide/${provideid}`,
    });
    console.log('제공신청내역상세', response.data.content);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}
