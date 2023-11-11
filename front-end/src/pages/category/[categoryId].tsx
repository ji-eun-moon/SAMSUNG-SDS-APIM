import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { getCategoryList } from '@/utils/axios/api';
import { TCategoryList, ICategory } from '@/types/Api';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import ApiCard from '@/components/atoms/ApiCard';
import CategoryLayout from '@/components/templates/CategoryLayout';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import PageLoading from '@/components/atoms/PageLoading';
import useUserStore from '@/store/useUserStore';
import ApiDescription from '@/components/organisms/api/ApiDescription';
import useMyApi from '@/hooks/useMyApi';

type SSGProps = {
  openCategory: number;
  openMyCategory: number;
};

const CategoryList: NextPage<SSGProps> = ({ openCategory, openMyCategory }: SSGProps) => {
  const { selectedTeam } = useUserStore();
  const router = useRouter();
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  const { useCategoryList, provideCategoryList } = useMyApi(selectedTeam);

  if (!categoryList || !useCategoryList || !provideCategoryList) {
    return <PageLoading />;
  }

  const category = categoryList?.find((item: ICategory) => item.categoryId === openCategory);

  if (!category) {
    return null;
  }

  return (
    <div>
      <BothLayout>
        {/* Side Nav */}
        <ApiSideBar
          useCategoryList={useCategoryList}
          provideCategoryList={provideCategoryList}
          openCategory={openCategory}
          categoryList={categoryList}
          defaultSelectedKey={(router.query.defaultSelectedKey as string) || 'all'}
          openMyCategory={openMyCategory}
        />
        {/* Page Content */}
        <CategoryLayout>
          <GoBack label={category?.categoryName} />
          <ApiDescription type="category" content={category?.description} categoryId={category?.categoryId} />
          {category?.apiList?.map((api) => (
            <div className="my-3">
              <ApiCard
                key={api.apiId}
                title={api.apiName}
                address={api.apiAddress}
                onClick={() => router.push(`/apis/detail/${api.apiId}`)}
              />
            </div>
          ))}
        </CategoryLayout>
      </BothLayout>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryList = await getCategoryList();
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
  const openCategory = Number(params?.categoryId);
  const openMyCategory = Number(params?.categoryId);
  return {
    props: { openCategory, openMyCategory },
  };
};

export default CategoryList;
