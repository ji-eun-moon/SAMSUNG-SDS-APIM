import axios from 'axios';
import axiosInstance from './axiosInstance';

export async function getGetegoryList() {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/category',
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGetegoryListTest() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3001/categoryList',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getApiStatus(props: string) {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3001/categoryList',
      params: {
        props,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
