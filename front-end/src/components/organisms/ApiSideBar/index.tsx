import React from 'react';
import { ApiSideBarProps } from '@/types/props/SideBarProps';
import SearchBar from '@/components/atoms/SearchBar';
import CategoryList from '@/components/organisms/CategoryList';
import SideBarBody from '@/components/atoms/SideBarBody';
import { Tabs, Tab } from '@nextui-org/react';

function ApiSideBar({
  openCategory,
  openMyCategory,
  useCategoryList,
  provideCategoryList,
  categoryList,
  defaultSelectedKey,
}: ApiSideBarProps) {
  return (
    <SideBarBody>
      <Tabs defaultSelectedKey={defaultSelectedKey}>
        <Tab key="all" title="전체 API">
          <SearchBar onSearchHandler={() => {}} placeholder="API 검색" />
          <div className="my-5">
            <CategoryList categoryList={categoryList} openCategory={openCategory} />
          </div>
        </Tab>
        <Tab key="my" title="MY API">
          <SearchBar onSearchHandler={() => {}} placeholder="API 검색" />
          <div className="mt-5">
            <div className="font-medium itdaText my-2">사용 API</div>
            <CategoryList categoryList={useCategoryList} openCategory={openMyCategory} />
          </div>
          <div className="mt-5">
            <div className="font-medium itdaText my-2">제공 API</div>
            <CategoryList categoryList={provideCategoryList} openCategory={-1} />
          </div>
        </Tab>
      </Tabs>
    </SideBarBody>
  );
}

export default ApiSideBar;
