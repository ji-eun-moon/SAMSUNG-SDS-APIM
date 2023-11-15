export interface BaseProps {
  type: 'category' | 'api';
}

export interface CategoryProps extends BaseProps {
  content: string;
  categoryId: number;
  categoryName: string;
}

export interface ApiProps extends BaseProps {
  content: string;
  apiId: number;
  categoryId: number;
  categoryName: string;
}

export type DescriptionProps = ApiProps | CategoryProps;
