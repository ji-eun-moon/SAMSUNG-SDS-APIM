import ProfileImg from '.';

export default {
  title: 'atoms/ProfileImg',
  tags: ['autodocs'],
  component: ProfileImg,
  argTypes: {
    src: {
      description: '이미지 주소',
    },
    width: {
      description: '이미지 너비',
    },
    height: {
      description: '이미지 높이',
    },
  },
};

export const Example = {
  args: {
    src: '/images/profileImg.png',
    width: 100,
    height: 100,
  },
};
