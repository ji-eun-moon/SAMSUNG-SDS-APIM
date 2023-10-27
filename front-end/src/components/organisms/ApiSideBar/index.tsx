import React from 'react';
import { ApiSideBarProps, MyApiSideBarProps } from '@/types/props/SideBarProps';
import SearchBar from '@/components/atoms/SearchBar';
import CategoryList from '@/components/organisms/CategoryList';
import SideBarBody from '@/components/atoms/SideBarBody';

function ApiSideBar({ my, ...props }: ApiSideBarProps | MyApiSideBarProps) {
  // My API 일 때
  if (my) {
    const { useCategoryList, provideCategoryList, openCategory } = props as MyApiSideBarProps;
    return (
      <SideBarBody>
        <div className="font-bold text-xl mx-2 my-5">MY API</div>
        <SearchBar onSearchHandler={() => {}} placeholder="API 검색" />
        <div className="mt-5">
          <div className="font-medium itdaText my-2">사용 API</div>
          <CategoryList categoryList={useCategoryList} openCategory={openCategory} />
        </div>
        <div className="mt-5">
          <div className="font-medium itdaText my-2">제공 API</div>
          <CategoryList categoryList={provideCategoryList} openCategory={-1} />
        </div>
      </SideBarBody>
    );
  }

  // 전체 API 일 때
  const { categoryList, openCategory } = props as ApiSideBarProps;
  return (
    <SideBarBody>
      <div className="font-bold text-xl mx-2 my-5">API 전체 보기</div>
      <SearchBar onSearchHandler={() => {}} placeholder="API 검색" />
      <div className="my-5">
        <CategoryList categoryList={categoryList} openCategory={openCategory} />
      </div>
    </SideBarBody>
  );
}

export default ApiSideBar;
