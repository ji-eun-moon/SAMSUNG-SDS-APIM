import SideBarMenu from '.';

export default {
  title: 'atoms/SideBarMenu',
  tags: ['autodocs'],
  component: SideBarMenu,
  argTypes: {
    title: {
      description: '메뉴 타이틀 이름',
    },
    conditionList: {
      description: '메뉴 리스트 - 필터 조건 리스트 (conditionId, title, 이동할 url)로 이루어진 리스트',
      table: {
        type: {
          summary: 'IFilterCondition[]',
          detail: 'conditionId(string), title(string), url(string)',
        },
      },
    },
  },
};

export const Example = {
  args: {
    title: 'API 상태 확인',
    conditionList: [
      { conditionId: '1', title: '전체 보기', url: '/apis/status' },
      { conditionId: '2', title: '정상 작동 보기', url: '/apis/status?filter=대기' },
      { conditionId: '2', title: '점검중 보기', url: '/apis/status?filter=점검' },
      { conditionId: '2', title: '오류 보기', url: '/apis/status?filter=오류' },
    ],
  },
};
