import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import BothLayout from '@/components/templates/BothLayout';
import ChartSideBar from '@/components/organisms/ChartSideBar';
import Usage from '@/components/organisms/statistics/Usage';
import ResponseTime from '@/components/organisms/statistics/ResponseTime';
import ResponseCode from '@/components/organisms/statistics/ResponseCode';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'next/router';
import GoBack from '@/components/atoms/GoBack';
import ChartFrame from '@/components/atoms/ChartFrame';

type SSGProps = {
  apiId: number;
};

const CategoryList: NextPage<SSGProps> = ({ apiId }: SSGProps) => {
  const { selectedTeam } = useUserStore();
  const router = useRouter();
  const { apiName } = router.query;
  return (
    <BothLayout>
      <ChartSideBar />
      <div>
        <GoBack label={(apiName as string) || ''} />
        <div className="my-8">
          <ChartFrame title="API 사용량">
            <Usage apiId={apiId} teamName={selectedTeam} />
          </ChartFrame>
        </div>
        <div className="my-8">
          <div className="flex justify-end mb-2">
            <div className="itdaSecondary text-sm">* 최근 24시간 기준</div>
          </div>
          <ChartFrame title="응답 시간">
            <ResponseTime apiId={apiId} teamName={selectedTeam} />
          </ChartFrame>
        </div>
        <div className="my-8">
          <div className="flex justify-end mb-2">
            <div className="itdaSecondary text-sm">* 최근 24시간 기준</div>
          </div>
          <ChartFrame title="응답 코드">
            <ResponseCode apiId={apiId} teamName={selectedTeam} />
          </ChartFrame>
        </div>
      </div>
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
