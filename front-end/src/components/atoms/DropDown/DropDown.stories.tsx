import DropDown from '.';

export default {
  title: 'atoms/DropDown',
  tags: ['autodocs'],
  component: DropDown,
  argTypes: {
    list: {
      description: 'title: dropdown에 표시될 글자, onClick: 클릭시 실행되는 함수, icon: title 왼쪽에 보여질 아이콘',
    },
  },
};

export const RoundedButton = {
  args: {
    list: [
      { title: '쪽지함', onClick: () => {} },
      { title: '모니터링', onClick: () => {} },
      { title: '통계', onClick: () => {} },
      { title: '신청', onClick: () => {} },
    ],
  },
};
