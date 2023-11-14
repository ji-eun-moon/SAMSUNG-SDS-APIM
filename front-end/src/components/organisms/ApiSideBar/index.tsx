import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { ApiSideBarProps } from '@/types/props/SideBarProps';
import SearchBar from '@/components/atoms/SearchBar';
import CategoryList from '@/components/organisms/CategoryList';
import { Tabs, Tab, Divider } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { IUser } from '@/types/User';
import styles from './ApiSideBar.module.scss';

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
    <div className={styles.SideBarBody}>
      {userInfo?.authority === '관리자' ? (
        <div className={styles.searchBar}>
          <SearchBar
            onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
            placeholder="API 검색"
            keyword={searchWord}
            onChange={setSearchWord}
          />
          <div className={styles.SideBarContent}>
            <CategoryList categoryList={categoryList} openCategory={openCategory} my={false} type="apis" />
          </div>
        </div>
      ) : (
        <Tabs defaultSelectedKey={defaultSelectedKey} className={styles.tabBody}>
          <Tab key="all" title="전체 API">
            <div className={styles.searchBar}>
              <SearchBar
                onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
                placeholder="API 검색"
                keyword={searchWord}
                onChange={setSearchWord}
              />
            </div>
            <div className={styles.SideBarContent}>
              <CategoryList categoryList={categoryList} openCategory={openCategory} my={false} type="apis" />
            </div>
          </Tab>
          <Tab key="my" title="MY API">
            <div className={styles.searchBar}>
              <SearchBar
                onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
                placeholder="API 검색"
                keyword={searchWord}
                onChange={setSearchWord}
              />
            </div>
            <div className={styles.SideBarContent}>
              <div className="font-medium itdaText my-2">사용 API</div>
              <CategoryList categoryList={useCategoryList} openCategory={openMyCategory} my type="apis" />
              <Divider className="my-5" />
              <div className="font-medium itdaText my-2">제공 API</div>
              <CategoryList categoryList={provideCategoryList} openCategory={-1} my type="apis" />
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
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
