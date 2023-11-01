import LongLineChart from '.';

export default {
  title: 'chart/LongLineChart',
  tags: ['autodocs'],
  component: LongLineChart,
  argTypes: {
    title: {
      description: '차트 제목',
    },
    dataValues: {
      description: '차트 y축 값 리스트',
    },
    dataNames: {
      description: '차트 x축 이름 리스트',
    },
    color: {
      description: '차트 색상',
    },
  },
};

// 임의의 데이터 생성
const generateData = () => {
  const dataValues = [];
  const dataNames = [];
  let currentDate = new Date();

  for (let i = 1; i <= 100; i += 1) {
    dataValues.push(Math.floor(Math.random() * 1000) + 100); // 100~1100 범위의 임의의 숫자
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    dataNames.push(formattedTime);
    currentDate = new Date(currentDate.getTime() + 60000); // 1분 후의 시간으로 설정
  }
  return { dataValues, dataNames };
};

const generatedData = generateData();

export const DefaultLongLineChart = {
  args: {
    title: '시간별 사용량',
    color: '#FEAEAE',
    dataValues: generatedData.dataValues,
    dataNames: generatedData.dataNames,
  },
};
