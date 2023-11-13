import React, { useState } from 'react';
import { ApiSideBarProps } from '@/types/props/SideBarProps';
import SearchBar from '@/components/atoms/SearchBar';
import CategoryList from '@/components/organisms/CategoryList';
import { Tabs, Tab, Divider } from '@nextui-org/react';
import { useRouter } from 'next/router';
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
  return (
    <div className={styles.SideBarBody}>
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
          </div>
          <Divider className="my-5" />
          <div className={styles.SideBarContent}>
            <div className="font-medium itdaText my-2">제공 API</div>
            <CategoryList categoryList={provideCategoryList} openCategory={-1} my type="apis" />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ApiSideBar;
