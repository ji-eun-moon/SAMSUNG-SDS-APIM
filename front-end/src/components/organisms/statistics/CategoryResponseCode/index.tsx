import useCategoryResponseCode from '@/hooks/useCategoryResponseCode';
import { Spinner } from '@nextui-org/react';
import { formatCategoryPieChartData } from '@/utils/chartData';
import CategoryPieChart from '@/components/chart/CategoryPieChart';
import Refresh from '@/components/atoms/Refresh';
import ChartFrame from '@/components/atoms/ChartFrame';

interface Props {
  categoryId: number;
  teamName: string;
  type: 'use' | 'provide';
}

function CategoryResponseCode({ categoryId, teamName, type }: Props) {
  const { responseCodeData, isResponseCodeLoading, refetchResponseCode } = useCategoryResponseCode({
    categoryId,
    teamName,
    type,
  });

  if (!responseCodeData) {
    return (
      <div className="my-8">
        <ChartFrame>
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        </ChartFrame>
      </div>
    );
  }

  const chartData = formatCategoryPieChartData(responseCodeData);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div>Response Code</div>
        <div className="flex gap-2 items-center">
          <div className="itdaSecondary text-sm">* 최근 24시간 기준</div>
          <Refresh onClick={refetchResponseCode} />
        </div>
      </div>
      <ChartFrame>
        {isResponseCodeLoading ? (
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        ) : (
          <CategoryPieChart
            title=""
            chartData={chartData}
            pieColors={['#FEAEAE', '#FDD09F', '#FBE38E', '#A9F4D0', '#D0E8FF', '#9A89FF']}
          />
        )}
      </ChartFrame>
    </div>
  );
}

export default CategoryResponseCode;
