import CustomDropDown from '.';

export default {
  title: 'atoms/CustomDropDown',
  tags: ['autodocs'],
  component: CustomDropDown,
  argTypes: {
    list: {
      description: 'title: dropdown에 표시될 글자, onClick: 클릭시 실행되는 함수',
    },
  },
};

export const RoundedButton = {
  args: {
    children: <p>테스트</p>,
  },
};
