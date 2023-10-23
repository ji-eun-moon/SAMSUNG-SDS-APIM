import { ComponentMeta, ComponentStory } from '@storybook/react';
import ShadowCard from '.';

export default {
  title: 'stories/ShadowCard',
  tags: ['autodocs'],
  component: ShadowCard,
  argTypes: {
    children: {
      description: '카드 내부에 들어갈 내용',
    },
    type: {
      description: '[small] border-radius: 0.25rem; [big] border-radius: 0.5rem;',
    },
  },
} as ComponentMeta<typeof ShadowCard>;

const Template: ComponentStory<typeof ShadowCard> = (args) => <ShadowCard {...args} />;

export const SmallCard = Template.bind({});
SmallCard.args = {
  children: <span>Small Card</span>,
  type: 'small',
};

export const BigCard = Template.bind({});
BigCard.args = {
  children: <span>Big Card</span>,
  type: 'big',
};
