import SideBarBody from '@/components/atoms/SideBarBody';
import SideBarMenu from '@/components/atoms/SideBarMenu';

function StatusSideBar() {
  const statusCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apis/status' },
    { conditionId: '2', title: '정상 작동 보기', url: '/apis/status?filter=정상' },
    { conditionId: '3', title: '점검중 보기', url: '/apis/status?filter=점검' },
    { conditionId: '4', title: '오류 보기', url: '/apis/status?filter=오류' },
  ];
  return (
    <SideBarBody>
      <div className="my-5">
        <SideBarMenu title="API 상태 확인" conditionList={statusCondition} />
      </div>
    </SideBarBody>
  );
}

export default StatusSideBar;
