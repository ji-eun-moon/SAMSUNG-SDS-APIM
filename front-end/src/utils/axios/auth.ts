import axios from 'axios';
import { ILogin } from '@/types/User';
import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';

export async function login({ employeeId, password }: ILogin) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://k9c201.p.ssafy.io/api/member/auth/login',
      data: { employeeId, pwd: password },
    });
    const { token } = response.data;
    Cookies.set('accessToken', token);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function logout() {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: 'https://k9c201.p.ssafy.io/api',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
