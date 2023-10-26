import RowTable from '.';

export default {
  title: 'atoms/RowTable',
  tags: ['autodocs'],
  component: RowTable,
  argTypes: {
    title: {
      description: '표의 타이틀',
    },
    headerContent: {
      description: '표의 헤더 내용',
    },
    bodyContent: {
      description: '표의 바디 내용',
    },
  },
};

export const DefaultRowTable = {
  args: {
    title: '신청 상태',
    headerContent: ['처리상태', '처리내용'],
    bodyContent: [
      {
        처리상태: '진행중',
        처리내용:
          'Daum 검색 API는 포털 사이트 Daum에서 방대한 웹 문서, 동영상, 이미지, 블로그, 책, 카페를 검색하는 기능을 제공합니다. 검색 결과는 JSON 객체로 전달돼 서비스에서 자유롭게 출력하거나 활용할 수 있습니다.',
      },
    ],
  },
};
