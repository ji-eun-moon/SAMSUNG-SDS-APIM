import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import BothLayout from '@/components/templates/BothLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';

const CategoryList: NextPage = () => {
  console.log('hihi');
  return (
    <BothLayout>
      <ChartSideBar />
      <div>통계 페이지</div>
    </BothLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiId = Number(params?.apiId);
  return {
    props: { apiId },
  };
};

export default CategoryList;
