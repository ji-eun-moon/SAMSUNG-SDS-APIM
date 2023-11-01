import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { getCategoryList, getUseCategoryList, getProvideCategoryList } from '@/utils/axios/api';
import { TCategoryList, ICategory } from '@/types/Api';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import ApiCard from '@/components/atoms/ApiCard';
import CategoryLayout from '@/components/templates/CategoryLayout';
import { useQuery } from 'react-query';
import NavBar from '@/components/organisms/NavBar';
import { IUser } from '@/types/User';
import { getUserInfo } from '@/utils/axios/user';
import { useRouter } from 'next/router';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledButton from '@/components/atoms/StyledButton';
import PageLoading from '@/components/atoms/PageLoading';
import useStore from '@/hooks/useStore';
import useUserStore from '@/store/useUserStore';

type SSGProps = {
  // category: ICategory;
  openCategory: number;
  openMyCategory: number;
};

const CategoryList: NextPage<SSGProps> = ({ openCategory, openMyCategory }: SSGProps) => {
  const selectedTeam = useStore(useUserStore, (state) => state.selectedTeam);
  const router = useRouter();
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  const { data: useCategoryList } = useQuery<TCategoryList>(
    `useCategoryList ${selectedTeam}`,
    async () => {
      const result = await getUseCategoryList(selectedTeam || '');
      return result;
    },
    {
      enabled: Boolean(selectedTeam),
    },
  );
  const { data: provideCategoryList } = useQuery<TCategoryList>(
    `provideCategoryList ${selectedTeam}`,
    async () => {
      const result = await getProvideCategoryList(selectedTeam || '');
      return result;
    },
    {
      enabled: Boolean(selectedTeam),
    },
  );

  // 데이터 요청으로 수정 필요
  const dropDownList = [
    { title: '메인', icon: 'home', onClick: () => {} },
    { title: '통계', icon: 'home', onClick: () => {} },
    { title: '모니터링', icon: 'home', onClick: () => {} },
  ];

  if (!categoryList || !useCategoryList || !provideCategoryList || !userInfo) {
    return <PageLoading />;
  }

  const category = categoryList?.find((item: ICategory) => item.categoryId === openCategory);

  if (!category) {
    return null;
  }

  return (
    <BothLayout>
      {/* Top Nav */}
      <NavBar position="top" userInfo={userInfo} noticeCnt="5" notices="메시지" dropDownList={dropDownList} />
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
        <ShadowCard type="small">
          <div className="m-3">
            <div>{category?.description}</div>
            <div className="flex justify-end">
              <div className="w-fit">
                <StyledButton type="button" label="사용 신청하기" radius="lg" variant="solid" onClick={() => {}} />
              </div>
            </div>
          </div>
        </ShadowCard>
        {category?.apiList?.map((api) => (
          <div className="my-3">
            <ApiCard
              key={api.apiId}
              title={api.apiName}
              address={api.apiAddress}
              onClick={() => router.push(`/apis/${api.apiId}/detail`)}
            />
          </div>
        ))}
      </CategoryLayout>
    </BothLayout>
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
