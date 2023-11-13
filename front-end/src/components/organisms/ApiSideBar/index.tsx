import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { ApiSideBarProps } from '@/types/props/SideBarProps';
import SearchBar from '@/components/atoms/SearchBar';
import CategoryList from '@/components/organisms/CategoryList';
import SideBarBody from '@/components/atoms/SideBarBody';
import { Tabs, Tab, Divider } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { IUser } from '@/types/User';

function ApiSideBar({
  openCategory,
  openMyCategory,
  useCategoryList,
  provideCategoryList,
  categoryList,
  defaultSelectedKey,
}: ApiSideBarProps) {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);

  if (userInfo === undefined) {
    return null;
  }

  return (
    <SideBarBody>
      {userInfo.authority === '관리자' ? (
        <>
          <SearchBar
            onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
            placeholder="API 검색"
            keyword={searchWord}
            onChange={setSearchWord}
          />
          <div className="my-5">
            <CategoryList categoryList={categoryList} openCategory={openCategory} my={false} type="apis" />
          </div>
        </>
      ) : (
        <Tabs defaultSelectedKey={defaultSelectedKey}>
          <Tab key="all" title="전체 API">
            <SearchBar
              onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
              placeholder="API 검색"
              keyword={searchWord}
              onChange={setSearchWord}
            />
            <div className="my-5">
              <CategoryList categoryList={categoryList} openCategory={openCategory} my={false} type="apis" />
            </div>
          </Tab>
          <Tab key="my" title="MY API">
            <SearchBar
              onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
              placeholder="API 검색"
              keyword={searchWord}
              onChange={setSearchWord}
            />
            <div className="mt-5">
              <div className="font-medium itdaText my-2">사용 API</div>
              <CategoryList categoryList={useCategoryList} openCategory={openMyCategory} my type="apis" />
            </div>
            <Divider className="my-5" />
            <div className="mt-5">
              <div className="font-medium itdaText my-2">제공 API</div>
              <CategoryList categoryList={provideCategoryList} openCategory={-1} my type="apis" />
            </div>
          </Tab>
        </Tabs>
      )}
    </SideBarBody>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('userInfo', getUserInfo);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ApiSideBar;
