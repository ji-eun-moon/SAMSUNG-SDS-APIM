import React from 'react';
import { Pagination } from '@nextui-org/react';
import style from './StyledPagination.module.scss';

interface StyledPaginationProps {
  totalPage: number;
  currentPage: number;
}

/**
 * StyledPagination 컴포넌트
 * @param {number} totalPage - 페이지의 총 길이
 * @param {number} currentPage - 현재 페이지
 */

function StyledPagination({ totalPage, currentPage }: StyledPaginationProps) {
  return (
    <div>
      <Pagination
        disableAnimation
        disableCursorAnimation
        showControls
        total={totalPage}
        initialPage={1}
        page={currentPage}
        siblings={2}
        boundaries={0}
        dotsJump={totalPage}
        color="primary"
      />
    </div>
  );
}

export default StyledPagination;
