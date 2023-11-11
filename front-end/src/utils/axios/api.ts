import { StatusPageable } from '@/types/Api';
import axiosInstance from './axiosInstance';

export async function getCategoryList() {
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

export async function getUseCategoryList(teamName: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/category/use',
      params: {
        teamName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProvideCategoryList(teamName: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/category/provide',
      params: {
        teamName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getApiStatus({ status, page, size, apiName }: StatusPageable) {
  if (status === '') {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/server/apis/status',
        params: {
          page,
          size,
          apiName,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: 'https://k9c201.p.ssafy.io/api/server/apis/status',
        params: {
          status,
          page,
          size,
          apiName,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export async function getApiDetail(apiId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/apis/detail',
      params: {
        apiId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getApiTestInfo(apiId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/apis/test',
      params: {
        apiId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function apiSearch(apiName: string) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/apis/search',
      params: {
        apiName,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getApiName(apiId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/apis/detail-name',
      params: {
        apiId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryName(categoryId: number) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/category/category-name',
      params: {
        categoryId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStatusCount() {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/apis/status-count',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
