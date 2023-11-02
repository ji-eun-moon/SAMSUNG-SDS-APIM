import SelectBox from '.';

export default {
  title: 'atoms/SelectBox',
  tags: ['autodocs'],
  component: SelectBox,
  argTypes: {
    list: {
      description: 'SelecBox에 들어갈 리스트',
    },
    placeholder: {
      description: 'placeholder에 들어갈 문자',
    },
    onChange: {
      description: '클릭시 실행할 함수',
    },
  },
};

export const Default = {
  args: {
    list: ['1번', '2번', '3번', '4번', '5번'],
    onChange: () => {},
  },
};
