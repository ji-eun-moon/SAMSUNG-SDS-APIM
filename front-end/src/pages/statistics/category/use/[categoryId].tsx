import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import DrawerLayout from '@/components/templates/DrawerLayout';
import ChartLayout from '@/components/templates/ChartLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import useUserStore, { getSelectedTeam } from '@/store/useUserStore';
import { getUseCategoryList, getCategoryName } from '@/utils/axios/api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ICategory } from '@/types/Api';
import GoBack from '@/components/atoms/GoBack';
import CategoryUsage from '@/components/organisms/statistics/CategoryUsage';
import CategoryListUsage from '@/components/organisms/statistics/CategoryListUsage';
import CategoryResponseCode from '@/components/organisms/statistics/CategoryResponseCode';

type SSGProps = {
  categoryId: number;
};

const CategoryList: NextPage<SSGProps> = ({ categoryId }: SSGProps) => {
  const { selectedTeam } = useUserStore();
  const { data } = useQuery<string>(['categoryName', categoryId], () => getCategoryName(categoryId));

  return (
    <DrawerLayout>
      <ChartSideBar type="use" openCategoryId={categoryId} />
      {categoryId === 0 ? (
        <div className="flex w-full justify-center my-80">사용 중인 API가 없습니다.</div>
      ) : (
        <div>
          <ChartLayout>
            <GoBack label={data || ''} />
            <CategoryUsage type="use" categoryId={categoryId} teamName={selectedTeam} />
            <CategoryListUsage type="use" categoryId={categoryId} teamName={selectedTeam} />
            <CategoryResponseCode type="use" categoryId={categoryId} teamName={selectedTeam} />
          </ChartLayout>
        </div>
      )}
    </DrawerLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const selectedTeam = await getSelectedTeam();
  const useCategoryList = await getUseCategoryList(selectedTeam);
  const paths =
    useCategoryList?.map((category: ICategory) => ({
      params: { categoryId: category.categoryId.toString() },
    })) || [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = Number(params?.categoryId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categoryName', categoryId], () => getCategoryName(categoryId));
  return {
    props: { categoryId, dehydratedState: dehydrate(queryClient) },
  };
};

export default CategoryList;
