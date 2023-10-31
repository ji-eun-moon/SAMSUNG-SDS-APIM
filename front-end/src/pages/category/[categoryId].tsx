import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { getGetegoryList } from '@/utils/axios/api';
import { TCategoryList, ICategory } from '@/types/Api';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import ApiCard from '@/components/atoms/ApiCard';
import CategoryLayout from '@/components/templates/CategoryLayout';

type SSGProps = {
  category: ICategory;
  categoryList: TCategoryList;
  openCategory: number;
};

const CategoryList: NextPage<SSGProps> = ({ categoryList, openCategory, category }: SSGProps) => (
  <BothLayout>
    {/* Top Nav */}
    <div>Top Nav 들어갈 부분</div>
    {/* Side Nav */}
    <ApiSideBar categoryList={categoryList} my={false} openCategory={openCategory} />
    {/* Page Content */}
    <CategoryLayout>
      <GoBack label={category.categoryName} />
      <div>{category.description}</div>
      {category.apiList.map((api) => (
        <ApiCard title={api.apiName} address={api.apiAddress} onClick={() => {}} />
      ))}
    </CategoryLayout>
  </BothLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryList = await getGetegoryList();
  const paths = categoryList.map((category: ICategory) => ({
    params: { categoryId: category.categoryId.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<SSGProps> = async ({ params }) => {
  const categoryList = await getGetegoryList();
  const category = categoryList.find((item: ICategory) => item.categoryId === Number(params?.categoryId));
  const openCategory = categoryList[0].categoryId;
  return {
    props: { categoryList, openCategory, category },
    revalidate: 60,
  };
};

export default CategoryList;
