import { useState, useEffect } from 'react';
import { TCategoryList } from '@/types/Api';
import { isUseCategory, isProvideCategory } from '@/utils/category';

interface Props {
  categoryId: number;
  useCategoryList: TCategoryList;
  provideCategoryList: TCategoryList;
}
const useCategoryStatus = ({ categoryId, useCategoryList, provideCategoryList }: Props) => {
  const [isUsed, setIsUsed] = useState(false);
  const [isProvided, setIsProvided] = useState(false);

  useEffect(() => {
    if (categoryId && useCategoryList && provideCategoryList) {
      setIsUsed(isUseCategory(categoryId, useCategoryList));
      setIsProvided(isProvideCategory(categoryId, provideCategoryList));
    }
  }, [categoryId, useCategoryList, provideCategoryList]);

  return { isUsed, isProvided };
};

export default useCategoryStatus;
