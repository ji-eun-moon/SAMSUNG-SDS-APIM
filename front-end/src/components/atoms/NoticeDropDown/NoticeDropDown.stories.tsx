import NoticeDropDown from '.';

export default {
  title: 'atoms/NoticeDropDown',
  tags: ['autodocs'],
  component: NoticeDropDown,
  argTypes: {
    children: {
      description: '쪽지 컴포넌트',
    },
  },
};

export const NoticeDrop = {
  args: {
    trigger: (
      <button type="button" className="flex justify-center items-center">
        버튼
      </button>
    ),
    children: <div>테스트</div>,
  },
};
