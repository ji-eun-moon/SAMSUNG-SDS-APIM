import NoticeList from '.';

export default {
  title: 'organisms/NoticeList',
  tags: ['autodocs'],
  component: NoticeList,
  argTypes: {
    noticeList: {
      description: '쪽지 데이터 리스트 입력',
    },
  },
};

export const NoticeListExample = {
  args: {
    noticeList: [
      {
        noticeId: 1,
        from: [
          {
            fromName: 'ITDA',
            fromImgUrl: '/images/profileImg.png',
          },
        ],
        title: "'이미지 검색하기' API 제공 신청이 승인되었습니다.",
        check: true,
        createdAt: new Date('2023-10-16 14:47:30'),
      },
      {
        noticeId: 2,
        from: [
          {
            fromName: 'ITDA',
            fromImgUrl: '/images/profileImg.png',
          },
        ],
        title: "'이미지 검색하기' API 제공 신청이 승인되었습니다.",
        check: true,
        createdAt: new Date('2023-10-16 14:47:30'),
      },
      {
        noticeId: 3,
        from: [
          {
            fromName: 'ITDA',
            fromImgUrl: '/images/profileImg.png',
          },
        ],
        title: "'이미지 검색하기' API 제공 신청이 승인되었습니다.",
        check: false,
        createdAt: new Date('2023-10-16 14:47:30'),
      },
      {
        noticeId: 4,
        from: [
          {
            fromName: 'ITDA',
            fromImgUrl: '/images/profileImg.png',
          },
        ],
        title: "'이미지 검색하기' API 제공 신청이 승인되었습니다.",
        createdAt: new Date('2023-10-16 14:47:30'),
      },
      {
        noticeId: 5,
        from: [
          {
            fromName: 'ITDA',
            fromImgUrl: '/images/profileImg.png',
          },
        ],
        title: "'이미지 검색하기' API 제공 신청이 승인되었습니다.",
        check: true,
        createdAt: new Date('2023-10-16 14:47:30'),
      },
    ],
  },
};
