import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { getGetegoryListTest } from '@/utils/axios/api';
import { TCategoryList, ICategory } from '@/types/Api';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import ApiCard from '@/components/atoms/ApiCard';
import CategoryLayout from '@/components/templates/CategoryLayout';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

type SSGProps = {
  category: ICategory;
  openCategory: number;
};

const CategoryList: NextPage<SSGProps> = ({ openCategory, category }: SSGProps) => {
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getGetegoryListTest);

  if (categoryList === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <BothLayout>
      {/* Top Nav */}
      <div>Top Nav 들어갈 부분</div>
      {/* Side Nav */}
      <ApiSideBar categoryList={categoryList} my={false} openCategory={openCategory} />
      {/* Page Content */}
      <CategoryLayout>
        <GoBack label={category?.categoryName} />
        <div>{category?.description}</div>
        {category?.apiList?.map((api) => (
          <ApiCard key={api.apiId} title={api.apiName} address={api.apiAddress} onClick={() => {}} />
        ))}
      </CategoryLayout>
    </BothLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryList = await getGetegoryListTest();
  const paths =
    categoryList?.map((category: ICategory) => ({
      params: { categoryId: category.categoryId.toString() },
    })) || [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('categoryList', getGetegoryListTest);
  const category = queryClient
    .getQueryData<TCategoryList>('categoryList')
    ?.find((item: ICategory) => item.categoryId === Number(params?.categoryId));
  const openCategory = Number(params?.categoryId);
  return {
    props: { dehydratedState: dehydrate(queryClient), openCategory, category },
  };
};

export default CategoryList;
