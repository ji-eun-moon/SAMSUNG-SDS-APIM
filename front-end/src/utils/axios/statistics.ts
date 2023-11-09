import { IChartParams } from '@/types/Statistics';
import axiosInstance from './axiosInstance';

export async function getMonthlyUsage({ apiId, teamName }: IChartParams) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/monthly',
      params: {
        apiId,
        teamName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getDailyUsage({ apiId, teamName }: IChartParams) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/daily',
      params: {
        apiId,
        teamName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getHourlyUsage({ apiId, teamName }: IChartParams) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/hourly',
      params: {
        apiId,
        teamName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getResponseTime({ apiId, teamName }: IChartParams) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/responseTime',
      params: {
        apiId,
        teamName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getResponseCode({ apiId, teamName }: IChartParams) {
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/responseCode',
      params: {
        apiId,
        teamName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
