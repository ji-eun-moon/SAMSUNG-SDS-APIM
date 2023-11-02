import { TCategoryList, ICategory } from '@/types/Api';

// 사용중인지 확인하는 함수
const shouldShowApplyButton = (category: ICategory, useCategoryList: TCategoryList) => {
  if (!category || !useCategoryList) {
    return false;
  }
  const { categoryId } = category;
  const isInUseCategoryList = useCategoryList.some((item) => item.categoryId === categoryId);
  // const isInProvideCategoryList = provideCategoryList.some((item) => item.categoryId === categoryId);

  return !isInUseCategoryList;
};

export default shouldShowApplyButton;
