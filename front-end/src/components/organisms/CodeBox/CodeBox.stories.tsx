import CodeBox from '.';

export default {
  title: 'atoms/CodeBox',
  tags: ['autodocs'],
  component: CodeBox,
  argTypes: {
    jsonString: {
      description: '출력할 JSON 형태의 String',
    },
  },
};

export const Example = {
  args: {
    jsonString: `{
        "name": "문지은",
        "age": 27,
        "city": "광주광역시"
      }`,
  },
};
