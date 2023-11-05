import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { getCategoryList, getUseCategoryList, getProvideCategoryList } from '@/utils/axios/api';
import { TCategoryList, ICategory } from '@/types/Api';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import ApiCard from '@/components/atoms/ApiCard';
import CategoryLayout from '@/components/templates/CategoryLayout';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledButton from '@/components/atoms/StyledButton';
import PageLoading from '@/components/atoms/PageLoading';
import useUserStore from '@/store/useUserStore';
import Modal from '@/components/organisms/Modal';
import TextArea from '@/components/atoms/TextArea';
import { useState } from 'react';
import shouldShowApplyButton from '@/utils/category';

type SSGProps = {
  openCategory: number;
  openMyCategory: number;
};

const CategoryList: NextPage<SSGProps> = ({ openCategory, openMyCategory }: SSGProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textWord, setTextWord] = useState('');
  const { selectedTeam } = useUserStore();
  const router = useRouter();
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

  if (!categoryList || !useCategoryList || !provideCategoryList) {
    return <PageLoading />;
  }

  const category = categoryList?.find((item: ICategory) => item.categoryId === openCategory);

  if (!category) {
    return null;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const useApplySubmit = () => {
    // 사용 신청 로직
  };

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
          <ShadowCard type="small">
            <div className="m-3">
              <div>{category?.description}</div>
              <div className="flex justify-end">
                {shouldShowApplyButton(category, useCategoryList) && (
                  <div className="w-fit">
                    <StyledButton
                      type="button"
                      label="사용 신청하기"
                      radius="lg"
                      variant="solid"
                      onClick={() => setIsModalOpen(true)}
                    />
                  </div>
                )}
              </div>
            </div>
          </ShadowCard>
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
      {isModalOpen && (
        <Modal
          type="custom"
          title="API 사용 신청"
          onClose={closeModal}
          buttonLabel="신청하기"
          onButton={useApplySubmit}
        >
          <div className="my-5" style={{ width: '500px' }}>
            <TextArea
              width="w-full"
              backgroundColor="#ffffff"
              textAreaWord={textWord}
              placeholder="신청 내용을 입력하세요."
              onChange={setTextWord}
            />
          </div>
        </Modal>
      )}
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
