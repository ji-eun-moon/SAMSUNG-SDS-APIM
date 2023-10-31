import React from 'react';
import { Pagination } from '@nextui-org/react';

interface StyledPaginationProps {
  totalPage: number;
  clickPage: number;
  onClickPage: (page: number) => void;
}
/**
 * StyledPagination 컴포넌트
 * @param {number} totalPage - 페이지의 총 길이
 */

function StyledPagination({ totalPage, clickPage, onClickPage }: StyledPaginationProps) {
  // const handlePageClick = (event: React.ChangeEvent<HTMLButtonElement>) => {
  //   console.log('zz', event);
  //   const page = event.currentTarget.value;
  //   onClickPage(page);
  // };
  return (
    <div>
      <Pagination
        disableAnimation
        disableCursorAnimation
        showControls
        total={totalPage}
        initialPage={1}
        page={clickPage}
        siblings={2}
        boundaries={0}
        dotsJump={totalPage}
        color="primary"
        onChange={onClickPage}
      />
    </div>
  );
}

export default StyledPagination;
