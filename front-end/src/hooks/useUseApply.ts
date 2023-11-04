import { useState } from 'react';
import axiosInstance from '@/utils/axios/axiosInstance';
import { ICheckApplyAvailable } from '@/types/Apply';

const useUseApply = ({ categoryId, teamName }: ICheckApplyAvailable) => {
  const [canApply, setCanApply] = useState<boolean>(false);
  const checkCanApply = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/submit/use/team/use-check',
        params: {
          categoryId,
          teamName,
        },
      });
      setCanApply(response.data);
    } catch (error) {
      console.log(`${categoryId}신청 가능 여부 확인 에러`, error);
    }
  };

  return { canApply, checkCanApply };
};

export default useUseApply;
