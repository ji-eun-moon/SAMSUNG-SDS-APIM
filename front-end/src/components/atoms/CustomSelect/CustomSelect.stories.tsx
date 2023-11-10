import CustomSelect from '.';

export default {
  title: 'atoms/CustomSelect',
  tags: ['autodocs'],
  component: CustomSelect,
  argTypes: {
    value: {
      description: '선택된 옵션',
    },
    items: {
      description: '옵션 리스트',
    },
    onChange: {
      description: '옵션 변경 함수',
    },
    size: {
      description: '폰트 크기',
    },
  },
};

export const Example = {
  args: {
    value: 'option1',
    items: ['option1', 'option2', 'option3'],
    onChange: () => {},
    size: '12px',
  },
};
