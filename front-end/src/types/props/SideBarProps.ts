import { TCategoryList } from '../Api';

export interface ApiSideBarProps {
  openCategory: number;
  categoryList: TCategoryList;
  my: false;
}

export interface MyApiSideBarProps {
  openCategory: number;
  useCategoryList: TCategoryList;
  provideCategoryList: TCategoryList;
  my: true;
}

export interface CategoryListProps {
  categoryList: TCategoryList;
  openCategory: number;
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
