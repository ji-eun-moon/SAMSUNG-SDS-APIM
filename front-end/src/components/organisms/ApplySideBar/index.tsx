import SideBarMenu from '@/components/atoms/SideBarMenu';
import StyledButton from '@/components/atoms/StyledButton';
import SideBarBody from '@/components/atoms/SideBarBody';

interface ApplySideBarProps {
  isUser: boolean;
}

function ApplySideBar({ isUser }: ApplySideBarProps) {
  const useCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apply/use/list' },
    { conditionId: '2', title: '대기 보기', url: '/apply/use/list?filter=대기' },
    { conditionId: '3', title: '승인 내역 보기', url: '/apply/use/list?filter=승인' },
    { conditionId: '4', title: '거절 내역 보기', url: '/apply/use/list?filter=거절' },
  ];

  const provideCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apply/provide/list' },
    { conditionId: '2', title: '대기 보기', url: '/apply/provide/list?filter=대기' },
    { conditionId: '3', title: '승인 내역 보기', url: '/apply/provide/list?filter=점검' },
    { conditionId: '4', title: '거절 내역 보기', url: '/apply/provide/list?filter=오류' },
  ];

  return (
    <SideBarBody>
      <div className="my-5 text-xl font-bold mx-2">API 신청 내역</div>
      <div className="grid grid-cols-1 content-between h-full mb-5">
        <div>
          <SideBarMenu title="사용 신청 내역" conditionList={useCondition} />
          <SideBarMenu title="제공 신청 내역" conditionList={provideCondition} />
        </div>
        {isUser && (
          <StyledButton variant="solid" radius="full" label="제공 신청 하기" onClick={() => {}} type="button" />
        )}
      </div>
    </SideBarBody>
  );
}

export default ApplySideBar;
