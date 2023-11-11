import { IChartParams, ICategoryChartParams } from '@/types/Statistics';
import axiosInstance from './axiosInstance';

export async function getMonthlyUsage({ apiId, teamName, type }: IChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/monthly',
      params: {
        apiId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getDailyUsage({ apiId, teamName, type }: IChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/daily',
      params: {
        apiId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getHourlyUsage({ apiId, teamName, type }: IChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/hourly',
      params: {
        apiId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getResponseTime({ apiId, teamName, type }: IChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/responseTime',
      params: {
        apiId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getResponseCode({ apiId, teamName, type }: IChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/responseCode',
      params: {
        apiId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryUsage({ categoryId, teamName, type }: ICategoryChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/monthly-category/one',
      params: {
        categoryId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryMonthlyUsage({ categoryId, teamName, type }: ICategoryChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/monthly-category',
      params: {
        categoryId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryDailyUsage({ categoryId, teamName, type }: ICategoryChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/daily-category',
      params: {
        categoryId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryHourlyUsage({ categoryId, teamName, type }: ICategoryChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/hourly-category',
      params: {
        categoryId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryResponseCode({ categoryId, teamName, type }: ICategoryChartParams) {
  const teamParam = type === 'use' ? teamName : null;
  try {
    const response = await axiosInstance({
      method: 'GET',
      url: '/server/usage/responseCode-category',
      params: {
        categoryId,
        teamName: teamParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
