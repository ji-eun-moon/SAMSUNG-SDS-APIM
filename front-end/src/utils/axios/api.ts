import axios from 'axios';

export async function getGetegoryList() {
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

export async function getApiList() {
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
