import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '.';

export default {
  title: 'stories/Input',
  tags: ['autodocs'],
  component: Input,
  argTypes: {
    width: {
      description: '인풋창 길이를 지정합니다',
    },
    backgroundColor: {
      description: '인풋창 배경색을 지정합니다.',
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  width: 'w-64',
  backgroundColor: 'bg-white',
};
