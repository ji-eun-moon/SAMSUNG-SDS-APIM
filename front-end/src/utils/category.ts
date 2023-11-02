import { TCategoryList, ICategory } from '@/types/Api';

// 사용중이거나 제공중인지 확인하는 함수
const shouldShowApplyButton = (
  category: ICategory,
  useCategoryList: TCategoryList,
  provideCategoryList: TCategoryList,
) => {
  if (!category || !useCategoryList || !provideCategoryList) {
    return false;
  }
  const { categoryId } = category;
  const isInUseCategoryList = useCategoryList.some((item) => item.categoryId === categoryId);
  const isInProvideCategoryList = provideCategoryList.some((item) => item.categoryId === categoryId);

  return !isInUseCategoryList && !isInProvideCategoryList;
};

export default shouldShowApplyButton;
