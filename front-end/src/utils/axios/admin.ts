import axiosInstance from './axiosInstance';

// 사용신청 승인
export async function putUseApplyAccept(useId: number) {
  try {
    const response = await axiosInstance({
      method: 'PUT',
      url: '/submit/use/accept',
      params: {
        useId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 사용신청 거절
export async function putUseApplyDeny(useId: number, denyReason: string) {
  try {
    const response = await axiosInstance({
      method: 'PUT',
      url: '/submit/use/deny',
      data: {
        id: useId,
        denyReason,
      },
    });
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

//-------------------------------------------------------------------------------------------

// 제공신청 승인
export async function putProvideApplyAccept(provideId: number, endpoint: string) {
  try {
    const response = await axiosInstance({
      method: 'PUT',
      url: '/submit/provide/accept',
      data: {
        provideId,
        endpoint,
      },
    });
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 제공신청 거절
export async function putProvideApplyDeny(provideId: number, denyReason: string) {
  try {
    const response = await axiosInstance({
      method: 'PUT',
      url: '/submit/provide/deny',
      data: {
        id: provideId,
        denyReason,
      },
    });
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

// 사용,제공 신청 결과 전송
export async function postNoticeResult(applyName: string, teamName: string, applyType: string, result: string) {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: '/member/notice/send/result',
      data: {
        applyName,
        teamName,
        applyType,
        result,
      },
    });
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}
