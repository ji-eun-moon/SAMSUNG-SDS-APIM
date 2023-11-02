import Status from '.';

export default {
  title: 'atoms/Status',
  tags: ['autodocs'],
  component: Status,
  argTypes: {
    status: {
      description: 'API 상태를 넣어줍니다.',
    },
  },
};

export const Normal = {
  args: {
    status: '정상',
  },
};

export const Error = {
  args: {
    status: '오류',
  },
};

export const Inspection = {
  args: {
    status: '점검',
  },
};
