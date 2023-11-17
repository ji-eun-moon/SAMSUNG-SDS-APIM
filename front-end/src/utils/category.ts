import { TCategoryList } from '@/types/Api';

// 사용 카테고리인지 확인
export const isUseCategory = (categoryId: number, useCategoryList: TCategoryList) => {
  if (!categoryId || !useCategoryList) {
    return false;
  }
  const isInUseCategoryList = useCategoryList.some((item) => item.categoryId === categoryId);

  return isInUseCategoryList;
};

// 제공 카테고리인지 확인
export const isProvideCategory = (categoryId: number, provideCategoryList: TCategoryList) => {
  if (!categoryId || !provideCategoryList) {
    return false;
  }
  const isInProvideCategoryList = provideCategoryList.some((item) => item.categoryId === categoryId);

  return isInProvideCategoryList;
};
