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
export async function getProvideApplyList(clickPage: number) {
  console.log('provide');
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/submit/provide/team',
      params: {
        teamName: 'project4',
        page: clickPage,
        size: 6,
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

// // 제공 신청 provideId 객체
// export async function getProvideApplyId() {
//   try {
//     const response = await axios({
//       method: 'GET',
//       url: 'https://k9c201.p.ssafy.io/api/submit/provide/ids-object',
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjA5MTAyODYiLCJpYXQiOjE2OTg4ODg5MzMsImV4cCI6MTY5OTQ5MzczM30.PHt70afkbFh8fbDx0BnYn3ZXOv1REDaeLnACn9O_qT4FjB8nPl2MSuBhsdaz5J8x19p3MOZhsHg9uq9awEgu0g',
//       },
//     });
//     console.log('제공 신청 provideId 객체', response);
//     return response.data;
//   } catch (error) {
//     console.error('error', error);
//     return null;
//   }
// }
// // 제공 신청 provideId 객체
// export async function getProvideApplyId() {
//   try {
//     const response = await axiosInstance({
//       method: 'GET',
//       url: '/submit/provide/ids-object',
//     });
//     console.log('제공 신청 provideId 객체', response);
//     return response.data;
//   } catch (error) {
//     console.error('error', error);
//     return null;
//   }
// }
