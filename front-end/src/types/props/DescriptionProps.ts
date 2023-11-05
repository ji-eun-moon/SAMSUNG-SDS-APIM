export interface BaseProps {
  type: 'category' | 'api';
}

export interface CategoryProps extends BaseProps {
  content: string;
  categoryId: number;
}

export interface ApiProps extends BaseProps {
  content: string;
  apiId: number;
  categoryId: number;
}

export type DescriptionProps = ApiProps | CategoryProps;
