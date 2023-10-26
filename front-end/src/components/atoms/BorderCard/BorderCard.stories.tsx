import BorderCard from '.';

export default {
  title: 'atoms/BorderCard',
  tags: ['autodocs'],
  component: BorderCard,
  argTypes: {
    children: {
      description: '카드 내부에 들어갈 내용',
    },
    onClick: {
      description: '카드를 클릭할 경우 실행되는 함수',
    },
  },
};

export const OnClickFalse = {
  args: {
    children: (
      <div>
        카드 내부에 들어갈
        <br />
        내용
      </div>
    ),
  },
};

export const OnClickTrue = {
  args: {
    children: (
      <div>
        카드 내부에 들어갈
        <br />
        내용
      </div>
    ),
    onClick: '',
  },
};
