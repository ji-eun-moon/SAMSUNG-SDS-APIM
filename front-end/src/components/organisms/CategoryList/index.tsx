import Category from '@/components/atoms/Category';
import { CategoryListProps } from '@/types/props/SideBarProps';

function CategoryList({ categoryList, openCategory }: CategoryListProps) {
  return (
    <div>
      {categoryList?.map((category) => (
        <Category
          key={category.categoryId}
          categoryName={category.categoryName}
          categoryId={category.categoryId}
          isOpen={category.categoryId === openCategory}
          apiList={category.apiList}
        />
      ))}
    </div>
  );
}

export default CategoryList;
