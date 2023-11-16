import { NextPage } from 'next';
import BothLayout from '@/components/templates/BothLayout';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { TCategoryList, TApiSearchList } from '@/types/Api';
import { getCategoryList, apiSearch } from '@/utils/axios/api';
import PageLoading from '@/components/atoms/PageLoading';
import GoBack from '@/components/atoms/GoBack';
import ApiCard from '@/components/atoms/ApiCard';
import useMyApi from '@/hooks/useMyApi';

const ApiSearch: NextPage = () => {
  const router = useRouter();
  const { selectedTeam } = useUserStore();
  const { useCategoryList, provideCategoryList } = useMyApi(selectedTeam);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);

  // 쿼리 문자열에서 검색어 추출
  const searchQuery = router.query.query as string;

  // 검색어를 사용하여 API 검색 수행
  const { data: searchResult } = useQuery<TApiSearchList>(
    `apiSearchResult ${searchQuery}`,
    async () => {
      const result = await apiSearch(searchQuery);
      return result;
    },
    {
      enabled: Boolean(searchQuery), // 검색어가 있는 경우에만 수행
    },
  );

  if (!categoryList || !useCategoryList || !provideCategoryList) {
    return <PageLoading />;
  }

  return (
    <BothLayout>
      <ApiSideBar
        useCategoryList={useCategoryList}
        provideCategoryList={provideCategoryList}
        openCategory={1}
        categoryList={categoryList}
        defaultSelectedKey={(router.query.defaultSelectedKey as string) || 'all'}
        openMyCategory={1}
      />
      <div>
        <GoBack label={`'${searchQuery}' API 검색 결과`} />
        {searchResult?.length === 0 ? (
          <div className="flex justify-center h-52 items-center">
            <div className="font-medium text-lg itdaSecondary">검색 결과가 없습니다.</div>
          </div>
        ) : (
          searchResult?.map((api) => (
            <div className="my-5">
              <ApiCard
                key={api.apiId}
                title={api.apiName}
                category={api.categoryName}
                address={api.apiAddress}
                onClick={() => router.push(`/apis/detail/${api.apiId}`)}
              />
            </div>
          ))
        )}
      </div>
    </BothLayout>
  );
};

export default ApiSearch;
