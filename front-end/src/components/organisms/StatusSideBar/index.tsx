import React from 'react';
import SideBarBody from '@/components/atoms/SideBarBody';
import SideBarMenu from '@/components/atoms/SideBarMenu';

function StatusSideBar() {
  const statusCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apply/use/list' },
    { conditionId: '2', title: '대기 보기', url: '/apply/use/list?filter=대기' },
    { conditionId: '2', title: '승인 내역 보기', url: '/apply/use/list?filter=승인' },
    { conditionId: '2', title: '거절 내역 보기', url: '/apply/use/list?filter=거절' },
  ];
  return (
    <SideBarBody>
      <SideBarMenu title="API 상태 확인" conditionList={statusCondition} />
    </SideBarBody>
  );
}

export default StatusSideBar;
