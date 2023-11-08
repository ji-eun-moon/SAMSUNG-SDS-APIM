import SelectBox from '.';

export default {
  title: 'atoms/SelectBox',
  tags: ['autodocs'],
  component: SelectBox,
  argTypes: {
    list: {
      description: 'SelectBox에 들어갈 리스트',
    },
    onChange: {
      description: '클릭시 실행할 함수',
    },
    defaultSelect: {
      description: '기본 선택 값',
    },
  },
};

export const Default = {
  args: {
    list: ['1번', '2번', '3번', '4번', '5번'],
    onChange: () => {},
    defaultSelect: '1번',
  },
};
