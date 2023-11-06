import { TCategoryList } from '../Api';

export interface ApiSideBarProps {
  openCategory: number;
  openMyCategory: number;
  categoryList: TCategoryList;
  useCategoryList: TCategoryList;
  provideCategoryList: TCategoryList;
  defaultSelectedKey: string;
}

export interface CategoryListProps {
  categoryList: TCategoryList;
  openCategory: number;
  my: boolean;
}

export interface IFilterCondition {
  conditionId: string;
  title: string;
  url: string;
}

export interface SideBarMenuProps {
  title: string;
  conditionList: IFilterCondition[];
}
