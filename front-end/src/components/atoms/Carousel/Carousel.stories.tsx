import Carousel from '.';

export default {
  title: 'atoms/Carousel',
  tags: ['autodocs'],
  component: Carousel,
  argTypes: {
    children: {
      description: '슬라이더 아이템 요소',
    },
  },
};

export const OnClickFalse = {
  args: {
    children: [
      <div className="text-white">1</div>,
      <div className="text-white">2</div>,
      <div className="text-white">3</div>,
      <div className="text-white">4</div>,
      <div className="text-white">5</div>,
      <div className="text-white">6</div>,
      <div className="text-white">7</div>,
      <div className="text-white">8</div>,
      <div className="text-white">9</div>,
    ],
  },
};
