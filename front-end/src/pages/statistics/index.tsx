import { GetStaticProps, NextPage } from 'next';
import ChartLayout from '@/components/templates/ChartLayout';
import DrawerLayout from '@/components/templates/DrawerLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import Usage from '@/components/organisms/statistics/Usage';
import ResponseTime from '@/components/organisms/statistics/ResponseTime';
import ResponseCode from '@/components/organisms/statistics/ResponseCode';
import useUserStore from '@/store/useUserStore';
import GoBack from '@/components/atoms/GoBack';
import Link from 'next/link';

import useApiStore from '@/store/useApiStore';

type SSGProps = {
  apiId: number;
};

const CategoryList: NextPage<SSGProps> = () => {
  const { selectedApi } = useApiStore((state) => state);
  const { selectedTeam } = useUserStore();

  return (
    <DrawerLayout>
      <ChartSideBar />
      <ChartLayout>
        <div className="flex justify-between">
          <GoBack label={selectedApi.name} />
          <Link href={`/apis/detail/${selectedApi.id}`}>
            <div className="underline cursor-pointer">API 상세 보기</div>
          </Link>
        </div>
        {/* 사용량 */}
        <div>
          <Usage apiId={selectedApi.id} teamName={selectedTeam} />
        </div>
        {/* 응답시간 */}
        <div>
          <ResponseTime apiId={selectedApi.id} teamName={selectedTeam} />
        </div>
        {/* 응답코드 */}
        <div>
          <ResponseCode apiId={selectedApi.id} teamName={selectedTeam} />
        </div>
      </ChartLayout>
    </DrawerLayout>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [],
//   fallback: true,
// });

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiId = Number(params?.categoryId);
  return {
    props: { apiId },
  };
};

export default CategoryList;
