import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '.';

export default {
  title: 'stories/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    children: {
      description: '버튼 내부에 들어갈 내용',
    },
    backgroundColor: {
      description: '버튼 배경색을 지정합니다',
    },
    type: {
      description:
        '[fullRounded] border-radius: 1.5rem; [emptyRounded] border-radius: 1rem; [fullStraight] border-radius: 0.5rem;',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const FullRoundedButton = Template.bind({});
FullRoundedButton.args = {
  children: <span>Full Rounded Button</span>,
  type: 'fullRounded',
};

export const EmptyRoundedButton = Template.bind({});
EmptyRoundedButton.args = {
  children: <span>Empty Rounded Button</span>,
  type: 'emptyRounded',
};

export const StraightButton = Template.bind({});
StraightButton.args = {
  children: <span>Straight Button</span>,
  type: 'fullStraight',
};
